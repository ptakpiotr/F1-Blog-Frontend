import { Image, MessageBar } from "@fluentui/react-components";

function NotFound() {
  return (
    <main className="not-found">
      <MessageBar
        intent="error"
        politeness="assertive"
        className="page-not-found"
      >
        <strong>Page not found</strong>
      </MessageBar>
      <Image
        src="https://images.unsplash.com/photo-1622401976173-a0b80c12fbd1?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        fit="cover"
        shape="rounded"
        alt="Not found"
      />
    </main>
  );
}

export default NotFound;
