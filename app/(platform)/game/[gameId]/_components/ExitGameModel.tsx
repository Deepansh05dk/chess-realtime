import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

const ExitGameModel = ({ onClick }: { onClick: () => void }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-28 h-14 bg-red-600 hover:bg-red-700 rounded-full font-bold text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
        Exit
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-900 border-2 border-red-500 rounded-xl shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-red-500 font-bold font-mono">
            Are you sure you want to exit?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300 font-mono">
            This action cannot be undone. Exiting now will count as a loss.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-mono bg-green-600 text-white font-bold hover:bg-green-700 border-none rounded-full px-6 py-2 transition-all duration-300 ease-in-out transform hover:scale-105">
            Continue Playing
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onClick}
            className="bg-red-600 text-white hover:bg-red-700 font-bold rounded-full px-6 py-2 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Exit Game
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExitGameModel;
