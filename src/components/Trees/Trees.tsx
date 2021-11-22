import React from 'react'
import { Helmet } from 'react-helmet'
import { Dropdown } from './Dropdown'
import { Selector } from './Selector'
import { defaultFamily, defaultOrder, getLevelValues } from './config'
import { LinkButton, downloadIcon, externalLinkIcon, ExternalLink, helpIcon } from 'common'

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

    const msaSvgLink = `https://s3.amazonaws.com/serratus.io/trees/svg-2021-11-21/svg_noscale/${selected[searchLevel]}.svg`
    const msaSvgScaledLink = `https://s3.amazonaws.com/serratus.io/trees/svg-2021-11-21/svg_scale/${selected[searchLevel]}.svg`
    const msaNewickLink = `https://s3.amazonaws.com/serratus.io/trees/tree/${selected[searchLevel]}.newick`
    const msaFastaLink = `https://s3.amazonaws.com/serratus.io/trees/msa/${selected[searchLevel]}.fasta`
    const reactMsaViewParams = {
        msaview: {
            data: {},
            id: 'YbZqQjM4G',
            type: 'MsaView',
            height: 550,
            treeAreaWidth: 400,
            treeWidth: 300,
            rowHeight: 20,
            scrollY: 0,
            scrollX: 0,
            blockSize: 1000,
            selectedStructures: [],
            labelsAlignRight: false,
            colWidth: 16,
            showBranchLen: true,
            bgColor: true,
            drawTree: true,
            drawNodeBubbles: true,
            colorSchemeName: 'maeditor',
            treeFilehandle: {
                uri: msaNewickLink,
            },
            msaFilehandle: { uri: msaFastaLink },
            currentAlignment: 0,
            collapsed: [],
        },
        nglSelection: '',
    }
    const reactMsaViewLink = `https://gmod.github.io/react-msaview/?data=${encodeURIComponent(
        JSON.stringify(reactMsaViewParams)
    )}#`

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
                        link={msaNewickLink}
                        text='Newick'
                        icon={downloadIcon}
                        download={true}
                    />
                    <LinkButton
                        link={msaFastaLink}
                        text='MSA'
                        icon={downloadIcon}
                        download={true}
                    />
                    <LinkButton
                        link={reactMsaViewLink}
                        text='MSA Viewer'
                        icon={externalLinkIcon}
                        newTab={true}
                    />
                    <ExternalLink href='https://github.com/ababaian/serratus/wiki/Trees-and-alignments-for-Ribovirus-orders-and-families'>
                        {helpIcon}
                    </ExternalLink>
                </div>
                <div className='flex flex-col justify-center my-2'>
                    <span className={loading ? 'text-center' : 'hidden'}>Loading...</span>
                    <div
                        className={
                            loading
                                ? 'invisible'
                                : 'flex flex-col justify-center items-center w-full'
                        }>
                        <div className='text-center my-2'>
                            Some of these trees are large. To read tip labels, you may have to the
                            SVG image file{' '}
                            <ExternalLink href={msaSvgLink} className='text-blue-600'>
                                here (constant size)
                            </ExternalLink>
                            or{' '}
                            <ExternalLink href={msaSvgScaledLink} className='text-blue-600'>
                                here (size scaled to # leaves)
                            </ExternalLink>
                            .
                        </div>
                        <img
                            className='w-3/4 lg:w-1/3'
                            src={msaSvgLink}
                            onLoad={() => setLoading(false)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
