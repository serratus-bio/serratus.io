import React from 'react'
import { Helmet } from 'react-helmet'
import { Dropdown } from './Dropdown'
import { Selector } from './Selector'
import { defaultFamily, defaultOrder, getLevelValues } from './config'
import { LinkButton, downloadIcon } from 'common'

export const Trees = () => {
    const [searchLevel, setSearchLevel] = React.useState('order')
    const [selected, setSelected] = React.useState({
        order: defaultOrder,
        family: defaultFamily,
    } as {
        [key: string]: any
    })

    const headTags = (
        <Helmet>
            <title>Serratus | Trees</title>
        </Helmet>
    )

    const treeImage = `https://textoverimage.moesif.com/image?image_url=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fd0%2F04%2F28%2Fd00428efa0bf27b9edd37eac32dfd2c1.png&text=${selected[searchLevel]}&text_color=f46923ff&text_size=64&margin=0&y_align=middle&x_align=center`

    return (
        <>
            <div className='mx-4 my-2'>
                {headTags}
                <div className='text-center text-xl'>Trees</div>
                <Selector searchLevel={searchLevel} setSearchLevel={setSearchLevel} />
                <div className='flex justify-center my-2'>
                    <div className='lg:w-64'>
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
                        link={'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg'}
                        text='Tree'
                        icon={downloadIcon}
                        download={true}
                    />
                    <LinkButton
                        link={'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg'}
                        text='MSA'
                        icon={downloadIcon}
                        download={true}
                    />
                </div>
                <div className='flex justify-center my-2'>
                    <img src={treeImage} />
                </div>
            </div>
        </>
    )
}
