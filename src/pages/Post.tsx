import { Label, Title3, Image } from "@fluentui/react-components";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";

function Post() {
  const { id } = useParams();

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["post", id],
  //   queryFn: async ({ queryKey }) => {
  //     const data = await axios.get<IPost>(``);
  //     return data.data;
  //   },
  // });

  // return (
  //   <main>
  //     <Title3 as="h3">{data?.title}</Title3>
  //     <Label>Post by {data?.authorName}</Label>
  //     <Image src={data?.photo} alt={data?.title} />
  //     <Markdown>{data?.content}</Markdown>
  //   </main>
  // );

  return (
    <main>
      <Title3 as="h3">
        {"Test post"} {id}
      </Title3>
      <Label>Post by Piotr Ptak</Label>
      <Image
        src={
          "https://images.unsplash.com/photo-1695299313084-da717e4add14?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        width={"35%"}
        alt={"Test post"}
      />
      <Markdown>{`# hello `}</Markdown>
    </main>
  );
}

export default Post;
