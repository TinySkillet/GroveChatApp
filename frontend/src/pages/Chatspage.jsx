import React, { useState } from "react";
import { ChatState } from "../context/chatProvider.jsx";
import { Flex } from "@chakra-ui/react";
import SideDrawer from "../components/misc/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";

const Chatspage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="w-full">
      {user && <SideDrawer />}
      <Flex justifyContent="space-between" w="100%" h="91vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Flex>
    </div>
  );
};

export default Chatspage;
