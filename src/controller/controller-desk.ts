import { TRepositoryGame } from "../@types/game";
import { ObserverEvent } from "../@types/observer";

export function DeskController(repo: TRepositoryGame, EventGame: { emit: ObserverEvent["emit"] }) {
    // # Util

    // # Use Case
    const togglePort = ({ code }: { code: string }) => {
        const port = togglePortRepo({ code })

        if (port) {
            const data = { data: port, message: `Port ${code} ${port.isOpen ? "open" : "closed"}` }
            EventGame.emit(`desk/ports/toggle`, data)
            port.isOpen && EventGame.emit(`desk/ports/open`, data)
            !port.isOpen && EventGame.emit(`desk/ports/close`, data)
        }
    };

    const toggleLight = ({ code }: { code: string }) => {
        const light = toggleLightRepo({ code })

        if (light) {
            const data = { data: light, message: `Light ${code} ${light.isOn ? "on" : "off"}` }
            EventGame.emit(`desk/lights/toggle`, data)
            light.isOn && EventGame.emit(`desk/lights/on`, data)
            !light.isOn && EventGame.emit(`desk/lights/off`, data)
        }
    };

    const toggleCamera = () => {
        const camera = toggleCameraRepo()

        if (camera) {
            const data = { data: camera, message: `Camera ${camera.isOpen ? "on" : "off"}` }
            EventGame.emit(`desk/lights/toggle`, data)
            camera.isOpen && EventGame.emit(`desk/camera/open`, data)
            !camera.isOpen && EventGame.emit(`desk/camera/close`, data)
        }
    }

    // # Repo
    // ## Light
    const getLightByCodeRepo = ({ code }: { code: string }) => {
        return repo.data.desk.lights.find((light) => light.code == code) || null
    };

    const toggleLightRepo = ({ code }: { code: string }) => {
        const light = repo.getLight({ code });

        if (!light) {
            return null
        }

        const toggleValue = !light.isOn;

        return repo.updateLight({
            where: { code },
            light: { ...light, isOn: toggleValue },
        });
    };

    // ## Port
    const getPortByCodeRepo = ({ code }: { code: string }) => {
        return repo.data.desk.ports.find((port) => port.code == code) || null
    };

    const togglePortRepo = ({ code }: { code: string }) => {
        const port = repo.getPort({ code });

        if (!port) {
            return null
        }

        const toggleValue = !port.isOpen;

        return repo.updatePort({
            where: { code },
            port: { ...port, isOpen: toggleValue },
        });
    };

    // ## Camera
    const toggleCameraRepo = () => {
        const { camera } = repo.data.desk;

        const toggleValue = !camera.isOpen;

        return repo.updateCamera({
            camera: { ...camera, isOpen: toggleValue },
        });
    };

    return {
        togglePort,
        toggleLight,
        toggleCamera
    };
}