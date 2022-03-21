class Node {
    constructor(action='', source='', destination='', duration=0) {
        this.action = action
	this.source = source
	this.destination = destination
        this.duration = duration
    }
}

export default Node
