import { useState, useEffect } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

const sampleData = [
  { day: 'Mon', score: 7 },
  { day: 'Tue', score: 8 },
  { day: 'Wed', score: 6 },
  { day: 'Thu', score: 9 },
  { day: 'Fri', score: 7 },
  { day: 'Sat', score: 8 },
  { day: 'Sun', score: 9 },
]

function App() {
  const [pingResult, setPingResult] = useState<string>('')

  useEffect(() => {
    fetch('/mcp/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'initialize',
        params: {
          protocolVersion: '2025-06-18',
          capabilities: {},
          clientInfo: { name: 'pwa', version: '0.1' },
        },
      }),
    })
      .then((r) => r.json())
      .then((data) => setPingResult(data.result?.serverInfo?.name ?? 'no response'))
      .catch(() => setPingResult('unreachable'))
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edouard</h1>
          <p className="text-muted-foreground mt-1">
            Personal assistant - calendar, projects, tasks, and coaching
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">MCP Connection</h2>
          <p className="text-sm text-muted-foreground">
            Server: <span className="font-mono font-medium">{pingResult || 'connecting...'}</span>
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Week Score</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={sampleData}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0a0a0a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0a0a0a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 5.9% 90%)" />
              <XAxis dataKey="day" stroke="hsl(240 3.8% 46.1%)" fontSize={12} />
              <YAxis domain={[0, 10]} stroke="hsl(240 3.8% 46.1%)" fontSize={12} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#0a0a0a"
                fill="url(#scoreGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default App
