
import React from 'react';
import { SegmentationTableProps } from './types';

const SegmentationTable: React.FC<SegmentationTableProps> = ({ title = "Target Segmentation", segments }) => {
    if (!segments || segments.length === 0) return null;

    return (
        <div className="space-y-8">
            <h2 className="text-[11px] font-bold tracking-[0.4em] text-stone-900 uppercase">{title}</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b-2 border-stone-900">
                            <th className="text-left px-4 py-4 text-[10px] font-bold tracking-[0.4em] uppercase text-stone-900">
                                Segment
                            </th>
                            <th className="text-left px-4 py-4 text-[10px] font-bold tracking-[0.4em] uppercase text-stone-900">
                                Market Share
                            </th>
                            <th className="text-left px-4 py-4 text-[10px] font-bold tracking-[0.4em] uppercase text-stone-900">
                                Mindset
                            </th>
                            <th className="text-left px-4 py-4 text-[10px] font-bold tracking-[0.4em] uppercase text-stone-900">
                                Opportunity
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {segments.map((segment, i) => (
                            <tr key={i} className="border-b border-stone-200">
                                <td className="px-4 py-6 text-sm font-medium text-stone-900">
                                    {segment.name}
                                </td>
                                <td className="px-4 py-6 text-sm font-light text-stone-600">
                                    {segment.share}
                                </td>
                                <td className="px-4 py-6 text-sm font-light text-stone-600">
                                    {segment.mindset}
                                </td>
                                <td className="px-4 py-6 text-sm font-light text-stone-600">
                                    {segment.opportunity}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SegmentationTable;
