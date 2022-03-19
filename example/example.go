package example

var EventJson = `
{
	"action": "A",
	"precedingActions": [],
	"duration", 5
}
`

var EventsJson = `
[
	{
		"action": "A",
		"precedingActions": [],
		"duration": 5
	},
	{
		"action": "B",
		"precedingActions": [],
		"duration": 7
	},
	{
		"action": "C",
		"precedingActions": ["A"],
		"duration": 6
	},
	{
		"action": "D",
		"precedingActions": ["A"],
		"duration": 8
	},
	{
		"action": "E",
		"precedingActions": ["B"],
		"duration": 3
	},
	{
		"action": "F",
		"precedingActions": ["C"],
		"duration": 4
	},
	{
		"action": "G",
		"precedingActions": ["C"],
		"duration": 2
	},
	{
		"action": "H",
		"precedingActions": ["E", "D", "F"],
		"duration": 5
	}
]
`
