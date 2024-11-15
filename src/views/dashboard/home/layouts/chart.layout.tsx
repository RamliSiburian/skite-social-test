'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Charts({ data }: { data: any }) {

	return (
		<ResponsiveContainer className='w-fit' height={294}>
			<BarChart
				data={data}
				margin={{
					top: 0,
					right: -10,
					left: -20,
					bottom: 0
				}}
				style={{ padding: '0px' }}
			>
				<CartesianGrid strokeDasharray="0 1" />
				<XAxis dataKey="total" tickLine={false} tick={{ fill: '#9E9D9D' }} />
				<Bar
					yAxisId="left"
					dataKey="income"
					fill="#B2C5D4"
					radius={[4, 4, 4, 4]}
					barSize={50} />
			</BarChart>
		</ResponsiveContainer>
	)
}
