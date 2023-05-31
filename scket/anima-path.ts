console.clear()

const animatronic: {
    currentPosition: { position: number, path: number },
    config: { retreatPositionsTime: number, nights: { night: number, activationTime: number, rates: { advance: number, retreat: number, attack: number } }[] },
    mapPath: { position: number, paths: { path: number, order: number }[], attack?: boolean }[]
} = {
    currentPosition: { position: 7, path: 0 },
    mapPath: [
        {
            position: 0, paths: [
                { path: 0, order: 0 }
            ]
        },
        {
            position: 1, paths: [
                { path: 0, order: 1 },
                { path: 1, order: 0 }
            ]
        },
        {
            position: 2, paths: [
                { path: 1, order: 1 }
            ]
        },
        {
            position: 7, paths: [
                { path: 0, order: 2 },
                { path: 2, order: 0 }
            ]
        },
        {
            position: 5, paths: [
                { path: 2, order: 1 }
            ]
        },
        {
            attack: true,
            position: 8,
            paths: [
                { path: 0, order: 3 }
            ]
        },
    ],
    config: {
        retreatPositionsTime: 2,
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

type IMapPath = { position: number, path: number, order: number, }

const getMapPaths = () => {
    const paths: { [x: number]: IMapPath[] } = {}
    const test: { [x: number]: IMapPath[] } = {}

    animatronic.mapPath.forEach(_map => {
        _map.paths.forEach(_path => {
            if (!paths[_path.path]) {
                paths[_path.path] = []
            }
            if (!test[_map.position]) {
                test[_map.position] = []
            }

            paths[_path.path].push({ position: _map.position, ..._path })
            test[_map.position].push({ position: _map.position, ..._path })
        })
    })

    console.log(test)

    return paths
}

const getPathByAnimatronic = () => {
    const allPaths = getMapPaths()

    const allPathsEnables: { [x: number]: IMapPath[] } = {}
    const currentPath: { [x: number]: IMapPath[] } = {}

    const indexCurrentPosition = allPaths[animatronic.currentPosition.path].findIndex(path => path.position == animatronic.currentPosition.position)

    for (let i = 0; i <= animatronic.config.retreatPositionsTime; i++) {
        const path = allPaths[animatronic.currentPosition.path][indexCurrentPosition - i]
        if (!path) { continue }

        if (i == 0) {
            const index = allPaths[path.path].findIndex(path => path.position == animatronic.currentPosition.position)

            continue
        }

        if (!currentPath[path.path]) { currentPath[path.path] = [] }
        if (!allPathsEnables[path.path]) { allPathsEnables[path.path] = [] }

        currentPath[path.path].push(path)
        allPathsEnables[path.path].push(path)
    }


    for (const i in currentPath) {
        const pathsEnable = currentPath[i]

        for (let j = 0; j < pathsEnable.length; j++) {
            const path = pathsEnable[j]

            for (const k in allPaths) {
                const _allPath = allPaths[k]

                let isAccept = false

                for (let l = 0; l < _allPath.length; l++) {
                    const p = _allPath[l]

                    if (p.path == path.path) { continue }

                    if (p.position == animatronic.currentPosition.position) { continue }

                    if (p.position == path.position) {
                        if (!isAccept) {
                            isAccept = true

                            continue
                        }
                    }

                    if (!isAccept) { continue }

                    if (!allPathsEnables[p.path]) { allPathsEnables[p.path] = [] }

                    allPathsEnables[p.path].push(p)
                }
            }
        }
    }

    return Object.keys(allPathsEnables).reduce<Omit<IMapPath, "order">[]>((acc, i, _, arr) => {
        acc = [
            ...acc,
            ...allPathsEnables[Number(i)].map(path => ({ path: path.path, position: path.position }))
        ]

        return acc
    }, [])
}

const pathsAnima = getPathByAnimatronic()
console.log("----------------------------------")
console.log(animatronic.currentPosition)
console.log(pathsAnima)
