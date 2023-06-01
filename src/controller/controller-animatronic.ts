import { IAnimatronic } from '../@types/animatronic'
import { TRepositoryGame } from '../@types/game'

type IMapPath = { position: number; path: number; stage: number }

export function AnimatronicController(repo: TRepositoryGame) {
    // # Util
    const getAnimatronicByPosition = ({ position }: { position: number }) => {
        const animatronic = repo.getData().animatronics.find(anima => anima.currentPosition.position == position) || null

        return animatronic
    }

    const getAnimatronicsByPosition = ({ position }: { position: number }) => {
        const animatronics = repo.getData().animatronics.filter(anima => anima.currentPosition.position == position)

        return animatronics
    }

    // # Use Case
    const getMapPaths = ({ animatronic }: { animatronic: IAnimatronic }) => {
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

    const getPathByAnimatronic = ({ name }: { name: string }) => {
        const animatronic = repo.getAnimatronic({ name })

        if (!animatronic) {
            console.log('!!!!')
            return []
        }

        const allPaths = getMapPaths({ animatronic })

        const allPathsEnables: { [x: number]: IMapPath[] } = {}

        const indexCurrentPosition = allPaths[animatronic.currentPosition.path].findIndex(path => path.position == animatronic.currentPosition.position)
        const currentPosition = allPaths[animatronic.currentPosition.path][indexCurrentPosition]

        for (const _p in allPaths) {
            for (let j = 0; j < allPaths[_p].length; j++) {
                const _path = allPaths[_p][j]

                if (_path.position == currentPosition.position) {
                    continue
                }

                if (_path.stage > currentPosition.stage) {
                    continue
                }

                if (!allPathsEnables[_path.path]) {
                    allPathsEnables[_path.path] = []
                }

                allPathsEnables[_path.path].push(_path)
                break
            }
        }

        return Object.keys(allPathsEnables)
            .reduce<IMapPath[]>((acc, i) => {
                acc = [...acc, ...allPathsEnables[Number(i)].map(path => ({ path: path.path, position: path.position, stage: path.stage }))]

                return acc
            }, [])
            .sort((a, b) => b.stage - a.stage)
            .slice(0, animatronic.config.retreatPositionsTime)
    }

    return {
        getPathByAnimatronic,
    }
}
