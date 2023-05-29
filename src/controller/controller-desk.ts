import { TRepositoryGame } from "../@types/game";

export function DeskController(repo: TRepositoryGame) {
    // # Util

    // # Use Case
    const togglePort = ({ code }: { code: string }) => { };

    // # Repo
    // ## Light
    const getLightByCodeRepo = ({ code }: { code: string }) => {
        const light =
            repo.data.desk.lights.find((light) => light.code == code) || null;

        return { light };
    };

    const toggleLightRepo = ({ code }: { code: string }) => {
        const { light } = repo.getLight({ code });

        if (!light) {
            return;
        }

        const toggleValue = !light.isOn;

        repo.updateLight({
            where: { code },
            light: { ...light, isOn: toggleValue },
        });
    };

    // ## Port
    const getPortByCodeRepo = ({ code }: { code: string }) => {
        const port = repo.data.desk.ports.find((port) => port.code == code) || null;

        return { port };
    };

    const togglePortRepo = ({ code }: { code: string }) => {
        const { port } = repo.getPort({ code });

        if (!port) {
            return;
        }

        const toggleValue = !port.isOpen;

        repo.updatePort({
            where: { code },
            port: { ...port, isOpen: toggleValue },
        });
    };

    // ## Camera
    const toggleCameraRepo = () => {
        const { camera } = repo.data.desk;

        const toggleValue = !camera.isOpen;

        repo.updateCamera({
            camera: { ...camera, isOpen: toggleValue },
        });
    };

    return {};
}
