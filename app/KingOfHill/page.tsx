"use client";

import { create } from "zustand";
import Stopwatch from "@/components/Stopwatch";
import Button from "@/components/Button";
import { shallow } from "zustand/shallow";
import { useRef } from "react";

export interface Team {
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
  setTeamTime: (index: number, time: number) => void;
  changeTeamName: (index: number, name: string) => void;
}

const useKingOfHillGameState = create<KingOfHillGameState>()((set) => ({
  teams: [],
  step: 0,
  setStep: (step: number) => set((state) => ({ step })),
  addTeam: (team: Team) => set((state) => ({ teams: [...state.teams, team] })),
  selectTeam: (index: number) => set(() => ({ activeTeam: index })),
  setTeamTime: (index: number, time: number) =>
    set((state) => {
      console.log("setTeamTime invoked", index, time);
      const team_ = { ...state.teams[index] };
      const teams_ = [...state.teams];
      team_.time += time - team_.time;
      teams_[index] = team_;
      return { teams: teams_ };
    }),
  changeTeamName: (index: number, name: string) =>
    set((state) => {
      const team_ = { ...state.teams[index] };
      const teams_ = [...state.teams];
      team_.name = name;
      teams_[index] = team_;
      return { teams: teams_ };
    }),
}));

const KingOfHillPage = () => {
  const currentStopwatch = useRef<any>(null);
  const [
    teams,
    step,
    addTeam,
    selectTeam,
    setStep,
    activeTeam,
    setTeamTime,
    changeTeamName,
  ] = useKingOfHillGameState(
    (state) => [
      state.teams,
      state.step,
      state.addTeam,
      state.selectTeam,
      state.setStep,
      state.activeTeam,
      state.setTeamTime,
      state.changeTeamName,
    ],
    shallow
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 font-mono bg-slate-600">
      <div className="flex flex-col gap-4">
        {step === 0 && (
          <>
            <h3>Pick the number of teams</h3>
            <div className="flex flex-col gap-4">
              <Button
                variant="primary"
                size="small"
                onClick={() => {
                  [{ name: "1", time: 0 }].forEach(addTeam);
                  setStep(1);
                }}
              >
                1
              </Button>
              <Button
                variant="primary"
                size="small"
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
                size="small"
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
                size="small"
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
                  size="small"
                >
                  {team.name}
                </Button>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {activeTeam != null && (
                <div key={activeTeam}>
                  <div className="text-base">{teams[activeTeam].name}</div>
                  <div className="text-base text-black">
                    <input
                      value={teams[activeTeam].name}
                      onChange={(e) =>
                        changeTeamName(activeTeam, e.target.value)
                      }
                    />
                  </div>
                  <Stopwatch
                    ref={currentStopwatch.current}
                    onStop={(time) => setTeamTime(activeTeam, time)}
                    setupTime={teams[activeTeam].time}
                    autoStart
                  />
                </div>
              )}
              <Button variant="secondary" onClick={() => setStep(2)}>
                Leader Board
              </Button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="grid grid-cols-2 gap-5">
              {[...teams].map((team) => (
                <>
                  <div className="text-base">{team.name}</div>
                  <div className="text-base">
                    {"Minutes: " +
                      Math.floor((team.time % 360000) / 6000)
                        .toString()
                        .padStart(2, "0") +
                      " Seconds: " +
                      Math.floor((team.time % 6000) / 100)
                        .toString()
                        .padStart(2, "0")}
                  </div>
                </>
              ))}
            </div>
            <Button variant="primary" onClick={() => setStep(1)}>
              Go Back to Stopwatches
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default KingOfHillPage;
