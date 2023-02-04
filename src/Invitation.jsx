import { createClient } from "agora-rtm-react";
import React from "react";
const useClient = createClient("975fe061fc2545ab9689211c11541c02");

const Invitation = () => {
  const Client = useClient();
  // Create LocalInvitation
  const localInvitation = Client.createLocalInvitation(
    "975fe061fc2545ab9689211c11541c02"
  );
  const inviteCall = () => {
    // Send call invitation
    console.log(localInvitation);
    console.log(Client);
    localInvitation.send();
  };

  // Cancel a call invitation.
  const cancelLocalInvitation = () => {
    // Cancel call invitation
    localInvitation.cancel();
  };

  // Accept call invitation
  const acceptCall = () => {
    remoteInvitation.accept();
  };

  // Refuse a call invitation.
  const refuseRemoteInvitation = (invitation) => {
    if (RtmCallManager != null) {
      RtmCallManager.refuseRemoteInvitation(invitation);
    }
  };
  return (
    <div>
      <button
        onClick={() => {
          console.log(inviteCall());
        }}
      >
        call
      </button>
      <button
        onClick={() => {
          console.log(cancelLocalInvitation());
        }}
      >
        cancel
      </button>
      <button
        onClick={() => {
          console.log(acceptCall());
        }}
      >
        answer
      </button>
    </div>
  );
};

export default Invitation;
