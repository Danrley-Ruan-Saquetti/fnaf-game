import { IAnimatronic } from '../@types/animatronic'
import { TRepositoryGame } from '../@types/game'

type IMapPath = { position: number, attack?: boolean }

export function AnimatronicController(repo: TRepositoryGame) {
    // # Util
    const getAnimatronicByPosition = ({ position }: { position: number }) => {
        const animatronic = repo.data.animatronics.find((anima) => anima.currentPosition.position == position) || null

        return animatronic
    }

    const getAnimatronicsByPosition = ({ position }: { position: number }) => {
        const animatronics = repo.data.animatronics.filter((anima) => anima.currentPosition.position == position)

        return animatronics
    }

    // # Use Case
    const getMapPaths = ({ animatronic }: { animatronic: IAnimatronic }) => {
        const paths: { [x: number]: IMapPath[] } = {}

        animatronic.mapPath.forEach(_map => {
            _map.paths.forEach(_path => {
                console.log({ position: _map.position, ..._path })
            })
        })





        animatronic.mapPath.forEach(_map => {
            _map.paths.forEach(_path => {
                if (!paths[_path.path]) {
                    paths[_path.path] = []
                }
                paths[_path.path].push({ position: _map.position, ...(_map.attack && { attack: _map.attack }) })
            })
        })

        console.log(paths)

        return paths
    }

    const getPathByAnimatronic = ({ name }: { name: string }) => {
        const animatronic = repo.getAnimatronic({ name })

        if (!animatronic) {
            return console.log('!!!!')
        }

        const allPaths = getMapPaths({ animatronic })

        const allPathsEnables: { [x: number]: IMapPath[] } = {}

        // for (let i = 0; i < allPaths.length; i++) {
        //     const _paths = allPaths[i]

        //     for (let j = 0; j < _paths.length; j++) {
        //         const _path = _paths[j]

        //         if (_path.position == animatronic.currentPosition.position) {
        //             allPathsEnables.push(_paths)
        //             j = _paths.length
        //         }


        //     }
        // }

        // console.log(allPaths)
        // console.log(allPathsEnables)

        // const pathsEnables = allPathsEnables.map(_paths => {
        //     return _paths.map((_path, i) => {
        //         return _path
        //     })
        // })

        // console.log(animatronic.currentPosition)
        // console.log(pathsEnables)
    }

    return {
        getPathByAnimatronic
    }
}
