import MessageListItem from "../components/MessageListItem";
import { useState } from "react";
import { Message, getMessages } from "../data/messages";
import { Dialog } from "@capacitor/dialog";
import { Geolocation } from "@capacitor/geolocation";
import { Http } from "@capacitor-community/http";
import { FilePicker, PickedFile } from "@capawesome/capacitor-file-picker";
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
  getPlatforms,
  isPlatform,
  useIonViewWillEnter,
} from "@ionic/react";
import moment from "moment";
import "./Home.css";
import { ShareButton } from "../components/ShareButton";
import { Filesystem, Directory } from "@capacitor/filesystem";

const Home: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [pickedFile, setPickedFile] = useState<PickedFile | undefined>(
    undefined
  );
  const [pickedFilePath, setPickedFilePath] = useState<string | undefined>(
    undefined
  );

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

            if (result.files.length > 0) {
              setPickedFile(result.files[0]);
            }
            Dialog.alert({ message });
          }}
        >
          Open File
        </IonButton>

        <IonButton
          onClick={async () => {
            if (isPlatform("electron")) {
              Dialog.alert({
                message:
                  "Geolocation on Electron requires a Google Maps API key. Read https://github.com/electron/electron/blob/main/docs/api/environment-variables.md#google_api_key",
              });
            } else {
              const coordinates = await Geolocation.getCurrentPosition();

              console.log("Current position:", coordinates);
              Dialog.alert({
                message: `Lat: ${coordinates.coords.latitude}, Lon: ${coordinates.coords.longitude}`,
              });
            }
          }}
        >
          Get My Location
        </IonButton>
        <IonButton
          onClick={async () => {
            // desktop browser -> desktop
            // Windows electron -> capacitor, electron, desktop, hybrid
            // Android phone -> android, cordova, capacitor, mobile, hybrid
            const platforms = getPlatforms();

            Dialog.alert({
              message: JSON.stringify(platforms),
            });
          }}
        >
          Display Platforms
        </IonButton>
        <IonButton
          onClick={async () => {
            const url =
              "https://s3.amazonaws.com/bloomharvest-sandbox/andrew_polk%40sil.org%2f5701dd46-8925-4a1c-a435-c9d81a5c5c75/The+Moon+and+the+Cap.bloompub";

            const options = {
              url,
              // headers: { 'X-Fake-Header': 'Fake-Value' },
              // params: { size: 'XL' },
            };

            const response = await Http.downloadFile({
              url,
              filePath: "book.bloompub",
              fileDirectory: Directory.Cache,
            });

            if (response.path) {
              await Dialog.alert({
                message: "Successfully downloaded.",
              });
              const statResult = await Filesystem.stat({
                path: "book.bloompub",
                directory: Directory.Cache,
              });
              await Dialog.alert({
                message: `Size: ${statResult.size}`,
              });

              setPickedFilePath(response.path);
            }
          }}
        >
          Download Book
        </IonButton>
        <ShareButton pickedFile={pickedFilePath} />
        <div
          style={{
            padding: "4px",
          }}
        >
          Random HTML Div including an <u>underlined section</u> and a{" "}
          <span style={{ color: "green" }}>green span</span>.
        </div>
        <div>The current time is: {moment().format()}</div>
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
