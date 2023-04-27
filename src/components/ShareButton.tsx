import { Dialog } from "@capacitor/dialog";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { PickedFile } from "@capawesome/capacitor-file-picker";
import { IonButton } from "@ionic/react";

interface ShareButtonProps {
  //   pickedFile: PickedFile | undefined;
  pickedFile: string | undefined;
}
export const ShareButton: React.FC<ShareButtonProps> = ({ pickedFile }) => {
  return (
    <IonButton
      disabled={!pickedFile}
      onClick={async () => {
        const files: string[] = [];
        if (pickedFile) {
          files.push(pickedFile);
        }

        // if (pickedFile?.path) {
        //   // For now, just copy it to the cache folder, because you don't need to request special permissions for that folder
        //   try {
        //     const copyResult = await Filesystem.copy({
        //       from: "pickedFile.path",
        //       to: "myAwesomeBook.bloompub",
        //       directory: Directory.Documents,
        //       toDirectory: Directory.Cache,
        //     });
        //     // files.push(copyResult.uri);
        //   } catch (err: unknown) {
        //     Dialog.alert({ message: "Error: " + err });
        //   }
        // }

        await Share.share({
          title: "Share book", // The email subject, if user selects email
          text: `Share ${files.length > 0 ? files[0] : "[]"}`,
          files,
          dialogTitle: "Share book",
        });
      }}
    >
      {/* Share {pickedFile?.name} */}
      Share Book
    </IonButton>
  );
};
