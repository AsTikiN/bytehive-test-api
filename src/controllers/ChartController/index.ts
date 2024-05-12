import { Request, Response } from "express";

export const ChartController = {
  tours(req: Request, res: Response) {
    const data = [
      { name: 'Group A', value: 2400 },
      { name: 'Group B', value: 4567 },
      { name: 'Group C', value: 1398 },
      { name: 'Group D', value: 9800 },
      { name: 'Group E', value: 3908 },
      { name: 'Group F', value: 4800 },
    ];
    return res.status(200).json(data)
  },
  income(req: Request, res: Response) {
    const data = [
      {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
    ];

    return res.status(200).json(data)
  },
  statistic(req: Request, res: Response) {
    const data = [
      {
        name: 'Page A',
        uv: 400,
        pv: 240,
        amt: 240,
      },
      {
        name: 'Page B',
        uv: 300,
        pv: 139,
        amt: 221,
      },
      {
        name: 'Page C',
        uv: 200,
        pv: 980,
        amt: 229,
      },
      {
        name: 'Page D',
        uv: 278,
        pv: 390,
        amt: 200,
      },
      {
        name: 'Page E',
        uv: 189,
        pv: 480,
        amt: 218,
      },
      {
        name: 'Page F',
        uv: 239,
        pv: 380,
        amt: 250,
      },
      {
        name: 'Page G',
        uv: 349,
        pv: 430,
        amt: 210,
      },
    ];

    return res.status(200).json(data)
  }
}