import MessageListItem from "../components/MessageListItem";
import { useState } from "react";
import { Message, getMessages } from "../data/messages";
import { Dialog } from "@capacitor/dialog";
import { Geolocation } from "@capacitor/geolocation";
import { FilePicker } from "@capawesome/capacitor-file-picker";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hello World</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Hello World</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton
          onClick={async () => {
            const result = await FilePicker.pickFiles({
              types: [
                "application/octet-stream",
                "application/zip",
                "application/x-zip",
                // TODO: There are other bloom-related ones that are included in BR, although they are thought to be probably unused
              ],
              multiple: false,
            });

            // Android: returned path=content://com.android.providers.downloads.documents/document/25190

            const message =
              result.files.length > 0
                ? result.files.map((x) => x.path).join(", ")
                : "No files.";
            Dialog.alert({ message });
          }}
        >
          Open File
        </IonButton>
        <IonButton
          onClick={async () => {
            const coordinates = await Geolocation.getCurrentPosition();

            console.log("Current position:", coordinates);
            Dialog.alert({
              message: `Lat: ${coordinates.coords.latitude}, Lon: ${coordinates.coords.longitude}`,
            });
          }}
        >
          Get My Location
        </IonButton>
        <div
          style={{
            padding: "4px",
          }}
        >
          Random HTML Div including an <u>underlined section</u> and a{" "}
          <span style={{ color: "green" }}>green span</span>.
        </div>
        <IonList>
          {messages.map((m) => (
            <MessageListItem key={m.id} message={m} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
