import { TRepositoryGame } from "../@types/game";

export function AnimatronicController(repo: TRepositoryGame) {
    const getAnimatronicByName = ({ name }: { name: string }) => {
        const animatronic =
            repo.data.animatronics.find((anima) => anima.name == name) || null;

        return { animatronic };
    };

    const getAnimatronicByPosition = ({ position }: { position: number }) => {
        const animatronic =
            repo.data.animatronics.find(
                (anima) => anima.currentPosition == position
            ) || null;

        return { animatronic };
    };

    const getAnimatronicsByPosition = ({ position }: { position: number }) => {
        const animatronics = repo.data.animatronics.filter(
            (anima) => anima.currentPosition == position
        );

        return { animatronics };
    };

    return {
        getAnimatronicByName,
        getAnimatronicByPosition,
        getAnimatronicsByPosition,
    };
}
