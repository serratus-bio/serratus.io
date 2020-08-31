import React from 'react';
import { Helmet } from 'react-helmet';
import QueryBuilder from '../components/Explorer/QueryBuilder';
import DataReference from '../components/DataReference';

import {
    switchSize,
    classesBoxBorder
} from '../helpers/common';

export default () => {
    return (
        <div className={`flex flex-col ${switchSize}:flex-row p-4 min-h-screen sm:bg-gray-200`}>
            <Helmet>
                <title>Serratus | Explore</title>
            </Helmet>
            <div className={`flex flex-col px-4 py-2 w-full ${switchSize}:w-1/3 ${classesBoxBorder}`}>
                <QueryBuilder />
                <div className={`hidden ${switchSize}:block mb-auto text-center`}>
                    <DataReference />
                </div>
            </div>
            <div className={`h-0 sm:h-3 ${switchSize}:w-3`} />
            <hr className="sm:hidden" />
            <div className={`p-4 w-full ${switchSize}:w-2/3 ${classesBoxBorder}`}>
                <div className={`${switchSize}:hidden`}>
                    <DataReference />
                </div>
            </div>
        </div>
    )
}
