import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ISingleComment, RaceRes } from "../Types";
import AppTable from "../components/AppTable";
import { columns } from "../renderers/RaceTabColumns";
import RaceTabRenderer from "../renderers/RaceTabRenderer";
import { Label, Title3, Tooltip } from "@fluentui/react-components";
import { Open24Regular } from "@fluentui/react-icons";
import RaceRating from "../components/RaceRating";
import { CommentPanel } from "../components/CommentPanel";
import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../App";
import { Client } from "@stomp/stompjs";

function Race() {
  const { season, round } = useParams();
  const raceId = `race-${season}-${round}`;

  const [comments, setComments] = useState<ISingleComment[]>([]);
  const [userRaceRating, setUserRaceRating] = useState<number>(3);

  const { userState } = useContext(UserContext);
  const stompClient = useMemo(() => {
    return new Client({
      brokerURL: `${import.meta.env.VITE_BACKEND_WS}ws`,
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }, []);

  useEffect(() => {
    if (stompClient) {
      stompClient.onConnect = () => {
        stompClient.publish({
          destination: "/app/getComments",
          body: JSON.stringify({ raceId }),
        });

        stompClient.publish({
          destination: "/app/score",
          body: JSON.stringify({
            rating: -1,
            raceId,
            userId: userState?.userId,
          }),
        });

        stompClient.subscribe("/topic/allcomments", (comments) => {
          setComments(JSON.parse(comments.body));
        });

        stompClient.subscribe("/topic/newcomment", (comment) => {
          setComments((prev) => [JSON.parse(comment.body), ...prev]);
        });

        stompClient.subscribe("/topic/scorechanged", (score) => {
          let rating = JSON.parse(score.body).rating;

          if (rating < 0) {
            rating = 0;
          }
          setUserRaceRating(rating);
        });
      };

      stompClient.onWebSocketError = (error) => {
        console.error("Error with websocket", error);
      };

      stompClient.onStompError = (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      };

      stompClient.activate();

      return () => {
        stompClient.deactivate();
      };
    }
  }, [stompClient]);

  const addComment = (comment: string) => {
    stompClient.publish({
      destination: "/app/addcomment",
      body: JSON.stringify({
        comment: comment,
        raceId,
        userId: userState?.userId,
      }),
    });
  };

  const setRaceRating = (rating: number) => {
    stompClient.publish({
      destination: "/app/score",
      body: JSON.stringify({
        rating,
        raceId,
        userId: userState?.userId,
      }),
    });
  };

  const { data } = useQuery({
    queryKey: ["race", season, round],
    queryFn: async ({}) => {
      const data = await axios.get<RaceRes>(
        `https://ergast.com/api/f1/${season}/${round}/results.json`
      );
      return data.data.MRData.RaceTable;
    },
  });
  return (
    <main className="main-race">
      <div className="race-info">
        <Title3 as="h3">
          {data?.season} {data?.Races[0].raceName}{" "}
          <Tooltip content="Open quali results" relationship="label">
            <Link to={`/quali/${season}/${round}`}>
              <Open24Regular />
            </Link>
          </Tooltip>
        </Title3>
        <div className="race-table">
          {data ? (
            <AppTable
              columns={columns}
              items={data.Races[0].Results}
              renderer={RaceTabRenderer}
            />
          ) : (
            <></>
          )}
        </div>
        <div>
          <Label>Rate the race: </Label>
          <RaceRating
            raceId={raceId}
            rating={userRaceRating}
            setRaceRating={setRaceRating}
          />
        </div>
      </div>
      <div className="race-discussion">
        <CommentPanel comments={comments} addComment={addComment} />
      </div>
    </main>
  );
}

export default Race;
