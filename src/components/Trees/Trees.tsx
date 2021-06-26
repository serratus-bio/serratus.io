import React from 'react'
import { Helmet } from 'react-helmet'
import { Dropdown } from './Dropdown'
import { Selector } from './Selector'
import { defaultFamily, defaultOrder, getLevelValues } from './config'
import { LinkButton, downloadIcon } from 'common'

export const Trees = () => {
    const [loading, setLoading] = React.useState(true)
    const [searchLevel, setSearchLevel] = React.useState('order')
    const [selected, setSelected] = React.useState({
        order: defaultOrder,
        family: defaultFamily,
    } as {
        [key: string]: any
    })

    React.useEffect(() => {
        setLoading(true)
    }, [searchLevel, selected])

    const headTags = (
        <Helmet>
            <title>Serratus | Trees</title>
        </Helmet>
    )

    const treeImage = `https://s3.amazonaws.com/serratus.io/svg/${selected[searchLevel]}.svg`

    return (
        <>
            <div className='mx-4 my-2'>
                {headTags}
                <div className='text-center text-xl'>Trees</div>
                <Selector searchLevel={searchLevel} setSearchLevel={setSearchLevel} />
                <div className='flex justify-center my-2'>
                    <div className='w-64'>
                        <Dropdown
                            values={getLevelValues(searchLevel)}
                            selected={selected[searchLevel]}
                            setSelected={(newValue) => {
                                setSelected((oldValues) => ({
                                    ...oldValues,
                                    [searchLevel]: newValue,
                                }))
                            }}
                        />
                    </div>
                </div>
                <div className='flex justify-center my-2'>
                    <LinkButton
                        link={`https://s3.amazonaws.com/serratus.io/tree/${selected[searchLevel]}.newick`}
                        text='Tree'
                        icon={downloadIcon}
                        download={true}
                    />
                    <LinkButton
                        link={`https://s3.amazonaws.com/serratus.io/msa/${selected[searchLevel]}.fasta`}
                        text='MSA'
                        icon={downloadIcon}
                        download={true}
                    />
                </div>
                <div className='flex justify-center my-2'>
                    <span className={loading ? '' : 'hidden'}>Loading...</span>
                    <img
                        className={loading ? 'invisible' : 'w-3/4 lg:w-1/3'}
                        src={treeImage}
                        onLoad={() => setLoading(false)}
                    />
                </div>
            </div>
        </>
    )
}
