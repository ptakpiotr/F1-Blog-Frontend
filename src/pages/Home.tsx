import {
  Body1,
  Card,
  CardHeader,
  CardPreview,
  Image,
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <main className="home-main">
      <Card
        onClick={() => {
          navigate("/posts");
        }}
      >
        <CardHeader header={<Body1>Posts</Body1>} />
        <CardPreview>
          <Image
            src="https://images.unsplash.com/photo-1698753047029-05b3011609b7?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fit="cover"
            shape="rounded"
          />
        </CardPreview>
      </Card>
      <Card
        onClick={() => {
          navigate("/results");
        }}
      >
        <CardHeader header={<Body1>Results</Body1>} />
        <CardPreview>
          <Image
            src="https://images.unsplash.com/photo-1615123817211-3fd919830594?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fit="cover"
            shape="rounded"
          />
        </CardPreview>
      </Card>
      <Card
        onClick={() => {
          navigate("/standings");
        }}
      >
        <CardHeader header={<Body1>Standings</Body1>} />
        <CardPreview>
          <Image
            src="https://images.unsplash.com/photo-1566569788881-69efe28d5ef9?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fit="cover"
            shape="rounded"
          />
        </CardPreview>
      </Card>
      <Card
        onClick={() => {
          navigate("/about");
        }}
      >
        <CardHeader header={<Body1>About</Body1>} />
        <CardPreview>
          <Image
            src="https://images.unsplash.com/photo-1698753033562-ddc9b3e5d920?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fit="cover"
            shape="rounded"
          />
        </CardPreview>
      </Card>
    </main>
  );
}

export default Home;
