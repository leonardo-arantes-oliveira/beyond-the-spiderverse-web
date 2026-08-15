import React, { forwardRef } from 'react';

const StarVs = forwardRef(({ className = '', fill = 'white' }, ref) => (
<svg ref={ref} width="173" height="173" viewBox="0 0 173 173" fill="none" className={className}>
    <g>
    <path d="M156.164 17.2277L100.341 87.9277L173.157 172.689L88.3957 99.8729L17.6957 155.696L73.5185 84.9957L0.702072 0.234024L85.4637 73.0505L156.164 17.2277Z" fill={fill}/>
    </g>
</svg>
));

export default StarVs;