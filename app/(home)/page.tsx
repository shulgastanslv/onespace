// import { getAllVaults } from '@/services/vault';
// import { Overview } from './_components/overview';
// import { getAllNotes } from '@/services/note';
// import { Vault } from '@/types/vault';
// import { getSession } from 'next-auth/react';
import Spline from '@splinetool/react-spline';
import { ThoughtBubble } from './_components/thought-bubble';


// async function getNotes(vaults: Vault[]) {
//   let notes = 0;
//   for (const vault of vaults) {
//     const notesInVault = await getAllNotes(vault.id);
//     notes += notesInVault.length;
//   }
//   return notes;
// }

// async function getNotesToday(vaults: Vault[]) {
//   let notes = 0;
//   for (const vault of vaults) {
//     const notesInVault = await getAllNotes(vault.id);
//     notes += notesInVault.filter(
//       (note) => note.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000),
//     ).length;
//   }
//   return notes;
// }

export default async function Home() {
  // const session = await getSession();
  // const vaults = await getAllVaults(session?.user?.id!);

  // const notes = await getNotes(vaults);
  // const hoursActive = 12;
  // const storageUsed = 0;
  // const maxStorage = 2000;

  // const vaultToday = vaults.filter(
  //   (vault) => vault.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000),
  // ).length;
  // const notesToday = await getNotesToday(vaults);
  // const hoursToday = 12;

  return (
    <main className="relative w-full overflow-hidden bg-transparent p-6 mt-16 h-screen">
      <div className="absolute inset-0 z-0">
        <ThoughtBubble />
        <Spline scene="https://prod.spline.design/i7I5xXWs0QhzbfF3/scene.splinecode" />
      </div>
      <div className="relative z-20">
        {/* <Overview
          vaults={vaults.length}
          notes={notes}
          hoursActive={hoursActive}
          storageUsed={storageUsed}
          maxStorage={maxStorage}
          vaultToday={vaultToday}
          notesToday={notesToday}
          hoursToday={hoursToday}
        /> */}
      </div>
    </main>
  );
}
