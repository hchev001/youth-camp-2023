"use client";

import Button from "@/components/Button";
import { create } from "zustand";

interface Award {
  name: string;
  point: number;
}
type PointBattleState = {
  step: number;
  awards: Award[];
};

type PointBattleActions = {
  setStep: (step: number) => void;
  updateAwards: (award: Award, idx: number) => void;
  addAward: () => void;
  deleteAward: (idx: number) => void;
};

const usePointBattleState = create<PointBattleState & PointBattleActions>()(
  (set) => ({
    step: 0,
    awards: [],
    setStep: (step: number) =>
      set((state) => {
        return {};
      }),
    updateAwards: (award: Award, idx: number) =>
      set((state) => {
        const awards_ = [...state.awards];
        awards_[idx] = award;

        return { awards: awards_ };
      }),
    addAward: () =>
      set((state) => {
        const awards = [...state.awards];
        awards.push({ name: "", point: 0 });
        return { awards };
      }),
    deleteAward: (idx) =>
      set((state) => ({
        awards: state.awards.filter((_, idx_) => idx !== idx_),
      })),
  })
);

const PointBattlePage = () => {
  const [step, awards, setStep, updateAwards, addAward, deleteAward] =
    usePointBattleState((state) => [
      state.step,
      state.awards,
      state.setStep,
      state.updateAwards,
      state.addAward,
      state.deleteAward,
    ]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 font-mono bg-slate-600">
      <div className="flex flex-col gap-4">
        {step === 0 && (
          <div>
            <div className="flex flex-col gap-2">
              <div className="text-base">Create the point system.</div>
              <div className="text-sm">
                Each entry represents the name of the award and the points
                (positive, 0, or negative). Add at least one award with a name
                to coninue.
              </div>
              <Button variant="primary" onClick={addAward}>
                Add award
              </Button>
              <div className="flex flex-col gap-2">
                {awards.map((award, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap gap-3 border-slate-200 border-2 p-2"
                  >
                    <div>
                      <div className="text-sm">Award Name</div>
                      <input
                        className="text-black"
                        value={award.name}
                        onChange={(e) =>
                          updateAwards({ ...award, name: e.target.value }, idx)
                        }
                      />
                    </div>
                    <div>
                      <div className="text-sm">Points</div>
                      <input
                        className="text-black"
                        type="number"
                        value={award.point}
                        onChange={(e) =>
                          updateAwards(
                            { ...award, point: +e.target.value },
                            idx
                          )
                        }
                      />
                    </div>
                    <button
                      onClick={() => deleteAward(idx)}
                      className="bg-red-400 px-2 py-1 focus:bg-red-700 hover:bg-red-700"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {awards.length > 0 && awards[0].name.length > 0 && (
              <div className="mt-3">
                <Button variant="success" onClick={() => setStep(1)}>
                  Continue
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PointBattlePage;
