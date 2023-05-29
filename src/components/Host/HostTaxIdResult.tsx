import React from 'react'

export const HostTaxIdResult = (props:any) => {
  const entry = props.entry;

  const [expandCollapse, setExpandCollapse] = React.useState(false);

  return <div>
    <div>
        <span className='font-bold text-xl'>{entry[1]['srarun.scientific_name']}</span>
        <span className='ml-2 text-sm'>{'TAX ID: ' + entry[0]}</span>
        <span className='ml-2 text-sm'>{entry[1]['srarun.run'].length + ' result' + (entry[1]['srarun.run'].length == 1 ? '' : 's')}</span>
        <span className='ml-2 text-sm' onClick={() => setExpandCollapse(!expandCollapse)} style={{ color:'#4BA3E3', cursor:'pointer', textTransform:'uppercase', userSelect:'none' }}>{!expandCollapse ? 'Expand ⬇︎' : 'Collapse ⬆︎'}</span>
    </div>
    <div style={{ height:'8px' }}></div>
    <div style={{ display:!expandCollapse ? 'none' : 'flex', flexWrap:'wrap', gap:'8px' }}>{entry[1]['srarun.run'].sort().map((run:any, run_i:any) => <a key={run_i} href={'/explorer/rdrp?run=' + run} style={{ color:'#4BA3E3', fontWeight:700 }}>{run}</a>)}</div>
  </div>;
}
