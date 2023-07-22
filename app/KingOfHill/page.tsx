"use client";

import { create } from "zustand";
import Stopwatch from "@/components/Stopwatch";
import Button from "@/components/Button";
import { shallow } from "zustand/shallow";

interface Team {
  name: string;
  time: number;
}

interface KingOfHillGameState {
  teams: Team[];
  activeTeam?: number;
  step: number;
  setStep: (step: number) => void;
  addTeam: (team: Team) => void;
  selectTeam: (index: number) => void;
}

const useKingOfHillGameState = create<KingOfHillGameState>()((set) => ({
  teams: [],
  step: 0,
  setStep: (step: number) => set((state) => ({ step })),
  addTeam: (team: Team) => set((state) => ({ teams: [...state.teams, team] })),
  selectTeam: (index: number) => set((state) => ({ activeTeam: index })),
}));

const KingOfHillPage = () => {
  const [teams, step, addTeam, selectTeam, setStep] = useKingOfHillGameState(
    (state) => [
      state.teams,
      state.step,
      state.addTeam,
      state.selectTeam,
      state.setStep,
    ],
    shallow
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 font-mono bg-slate-600">
      <div className="flex flex-col gap-4">
        {step === 0 && (
          <>
            <h3>Pick the number of teams</h3>
            <div className="flex flex-col gap-4">
              <Button
                variant="primary"
                onClick={() => {
                  [{ name: "1", time: 0 }].forEach(addTeam);
                  setStep(1);
                }}
              >
                1
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  [
                    { name: "1", time: 0 },
                    { name: "2", time: 0 },
                  ].forEach(addTeam);
                  setStep(1);
                }}
              >
                2
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  [
                    { name: "1", time: 0 },
                    { name: "2", time: 0 },
                    { name: "3", time: 0 },
                  ].forEach(addTeam);
                  setStep(1);
                }}
              >
                3
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  [
                    { name: "1", time: 0 },
                    { name: "2", time: 0 },
                    { name: "3", time: 0 },
                    { name: "4", time: 0 },
                  ].forEach(addTeam);
                  setStep(1);
                }}
              >
                4
              </Button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div className="grid grid-cols-2 gap-2">
              {teams.map((team, idx) => (
                <Button
                  key={team.name}
                  onClick={() => selectTeam(idx)}
                  variant="success"
                >
                  {team.name}
                </Button>
              ))}
            </div>
          </>
        )}

        <Stopwatch />
      </div>
    </div>
  );
};

export default KingOfHillPage;
