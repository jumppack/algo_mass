// // You are given the heads of two sorted linked lists list1 and list2.

// // Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

// // Return the head of the merged linked list.



// Input: list1 = [1,2,4], list2 = [1,3,4]
// Output: [1,1,2,3,4,4]
// Example 2:

// Input: list1 = [], list2 = []
// Output: []
// Example 3:

// Input: list1 = [], list2 = [0]
// Output: [0]


// Definition for singly-linked list.
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
    this.print = () => {
        let out = [this.val + '->'];
        let next = this.next;
        while(next != null) {
            out.push(next.val + '->');
            next = next.next;
        }
        console.log(out.join());
    }
}

/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */

// Approach: two pointer apporach. Understand the array and iterate over it
// compare the value and understand which item will come next in the out ListNode.
function mergeTwoLists(l1, l2) {
    let outHead = new ListNode(-1);
    let outList = outHead;

    l1.print();
    l2.print();

    list1 = l1;
    list2 = l2;

    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            outList.next = list1;
            list1 = list1.next;
        } else {
            outList.next = list2;
            list2 = list2.next;
        }
        outList = outList.next;
    }

    if (list1 != null) {
        outList.next = list1;
    } else {
        outList.next = list2;
    }

    return outHead.next;
}

// Testing
let l1 = new ListNode(1);
l1.next = new ListNode(2);
l1.next.next = new ListNode(4)

let l2 = new ListNode(1);
l2.next = new ListNode(3);
l2.next.next = new ListNode(4);

let result = mergeTwoLists(l1, l2);
result.print();
console.log(`Expected: 1, 1, 2, 3, 4, 4`);