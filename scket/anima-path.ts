console.clear()

const animatronic: {
    currentPosition: { position: number, path: number },
    config: { retreatPositionsTime: number, nights: { night: number, activationTime: number, rates: { advance: number, retreat: number, attack: number } }[] },
    mapPath: { stage: number, position: number, paths: { path: number, order: number }[], attack?: boolean }[]
} = {
    currentPosition: { position: 8, path: 0 },
    mapPath: [
        {
            stage: 0,
            position: 0, paths: [
                { path: 0, order: 0 }
            ]
        },
        {
            stage: 5,
            position: 1, paths: [
                { path: 0, order: 1 },
                { path: 1, order: 0 }
            ]
        },
        {
            stage: 5,
            position: 2, paths: [
                { path: 1, order: 1 }
            ]
        },
        {
            stage: 8,
            position: 7, paths: [
                { path: 0, order: 2 },
                { path: 2, order: 0 }
            ]
        },
        {
            stage: 8,
            position: 5, paths: [
                { path: 2, order: 1 }
            ]
        },
        {
            attack: true,
            stage: 10,
            position: 8,
            paths: [
                { path: 0, order: 3 }
            ]
        },
    ],
    config: {
        retreatPositionsTime: 3,
        nights: [{
            night: 1,
            activationTime: 0,
            rates: {
                retreat: 45,
                advance: 25,
                attack: 10,
            }
        }]
    },
}

type IMapPath = { position: number, path: number, stage: number }

const getMapPaths = () => {
    const paths: { [x: number]: IMapPath[] } = {}

    animatronic.mapPath.forEach(_map => {
        _map.paths.forEach(_path => {
            if (!paths[_path.path]) {
                paths[_path.path] = []
            }

            paths[_path.path].push({ position: _map.position, ..._path, stage: _map.stage })
        })
    })

    return paths
}

const getPathByAnimatronic = () => {
    const allPaths = getMapPaths()

    const allPathsEnables: { [x: number]: IMapPath[] } = {}

    const indexCurrentPosition = allPaths[animatronic.currentPosition.path].findIndex(path => path.position == animatronic.currentPosition.position)
    const currentPosition = allPaths[animatronic.currentPosition.path][indexCurrentPosition]

    for (const _p in allPaths) {
        for (let j = 0; j < allPaths[_p].length; j++) {
            const _path = allPaths[_p][j]

            if (_path.position == currentPosition.position) { continue }

            if (_path.stage > currentPosition.stage) { continue }

            if (!allPathsEnables[_path.path]) { allPathsEnables[_path.path] = [] }

            allPathsEnables[_path.path].push(_path)
            break
        }
    }

    return Object.keys(allPathsEnables).reduce<IMapPath[]>((acc, i) => {
        acc = [
            ...acc,
            ...allPathsEnables[Number(i)].map(path => ({ path: path.path, position: path.position, stage: path.stage }))
        ]

        return acc
    }, []).sort((a, b) => b.stage - a.stage).slice(0, animatronic.config.retreatPositionsTime)
}

const pathsAnima = getPathByAnimatronic()
console.log("----------------------------------")
console.log(animatronic.currentPosition)
console.log(pathsAnima)
