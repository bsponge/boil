package linkedlist

import (
	"fmt"
)

type node[T any] struct {
	value *T
	next  *node[T]
}

type LinkedList[T any] struct {
	node     *node[T]
	sentinel *node[T]
}

func (l *LinkedList[T]) AddNode(value *T) {
	n := &node[T]{
		value: value,
	}

	if l.node == nil {
		l.node = n
		l.sentinel = n
	} else {
		l.sentinel.next = n
		l.sentinel = n
	}
}

func (l *LinkedList[T]) String() string {
	s := ""
	for n := l.node; n != nil; n = n.next {
		s += fmt.Sprintf("%v", *n.value)
		s += " -> "
	}
	s += "end"
	return s
}
