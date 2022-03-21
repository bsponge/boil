class Node {
    constructor(action='', precedingActions=[], duration=0) {
        this.action = action
        this.precedingActions = precedingActions
        this.duration = duration
    }
}

export default Node