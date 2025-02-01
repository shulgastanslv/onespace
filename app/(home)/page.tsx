import { getAllVaults } from '@/services/vault';
import { Overview } from './_components/overview';
import { getAllNotes } from '@/services/note';
import { Vault } from '@/types/vault';

async function getNotes(vaults: Vault[]) {
  let notes = 0;
  for (const vault of vaults) {
    const notesInVault = await getAllNotes(vault.id);
    notes += notesInVault.length;
  }
  return notes;
}

async function getNotesToday(vaults: Vault[]) {
  let notes = 0;
  for (const vault of vaults) {
    const notesInVault = await getAllNotes(vault.id);
    notes += notesInVault.filter((note) => note.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000)).length;
  }
  return notes;
}

export default async function Home() {

  const vaults = (await getAllVaults()).length;

  const notes = await getNotes(await getAllVaults());
  const hoursActive = 12;
  const storageUsed = 85;
  const maxStorage = 2000;

  const vaultToday = (await getAllVaults()).filter((vault) => vault.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000)).length;
  const notesToday = await getNotesToday(await getAllVaults());
  const hoursToday = 12;

  return (
    <main className="relative w-full overflow-hidden bg-transparent p-6 mt-16 h-screen">
      <div className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Overview
            vaults={vaults}
            notes={notes}
            hoursActive={hoursActive}
            storageUsed={storageUsed}
            maxStorage={maxStorage}
            vaultToday={vaultToday}
            notesToday={notesToday}
            hoursToday={hoursToday}
          />
        </div>
      </div>
    </main>
  );
}
