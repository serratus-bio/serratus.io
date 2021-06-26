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
                <div className='text-center text-xl mb-2'>Trees and Alignments</div>
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
                        text='Newick'
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
                <div className='flex flex-col justify-center my-2'>
                    <span className={loading ? 'text-center' : 'hidden'}>Loading...</span>
                    <div
                        className={
                            loading
                                ? 'invisible'
                                : 'flex flex-row justify-center items-center w-full'
                        }>
                        <img
                            className='w-3/4 lg:w-1/3'
                            src={treeImage}
                            onLoad={() => setLoading(false)}
                        />
                        <div className='flex flex-col'>
                            <div className='flex flex-row'>
                                <span
                                    className='w-5 h-5 mr-2'
                                    style={{ backgroundColor: '#017500' }}
                                />
                                known species
                            </div>
                            <div className='flex flex-row'>
                                <span
                                    className='w-5 h-5 mr-2'
                                    style={{ backgroundColor: '#ff03ff' }}
                                />
                                novel species found by Serratus
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
