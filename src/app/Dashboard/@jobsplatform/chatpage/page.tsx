export default function Chats() {
  return (
    <div className="flex flex-row flex-1">
      <div>
        <Chatlist />
      </div>
      <div>
        <Chatpage />
      </div>
    </div>
  );
}

function Chatlist() {
  return (
    <div>WELCOME TO CHATS WHEN A RECREUITER CONTACTS YOU IT WILL SHOW HERE</div>
  );
}

function Chatpage() {
  return (
    <div className="border-r-indigo-950 bg-blue-800 h-['100%'] ">
      <div>Chat page</div>
    </div>
);
}
