package linkedlist

import (
	"fmt"
)

type Node[T any] struct {
	Value *T
	Next  *Node[T]
}

type LinkedList[T any] struct {
	Node     *Node[T]
	sentinel *Node[T]
}

func (l *LinkedList[T]) AddNode(value *T) {
	n := &Node[T]{
		Value: value,
	}

	if l.Node == nil {
		l.Node = n
		l.sentinel = n
	} else {
		l.sentinel.Next = n
		l.sentinel = n
	}
}

func (l *LinkedList[T]) Len() int {
	size := 0
	for n := l.Node; n != nil; n = n.Next {
		size++
	}

	return size
}

func (l *LinkedList[T]) String() string {
	s := ""
	for n := l.Node; n != nil; n = n.Next {
		s += fmt.Sprintf("%v", *n.Value)
		s += " -> "
	}
	s += "end"
	return s
}
