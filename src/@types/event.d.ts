export interface IEvent<T> {
    data: T
    message: string
}

export type IEventTypes = "game/start" | "game/end-game" | "desk/ports/toggle" | "desk/ports/open" | "desk/ports/close" | "desk/lights/toggle" | "desk/lights/on" | "desk/lights/off" | "desk/camera/toggle" | "desk/camera/open" | "desk/camera/close"