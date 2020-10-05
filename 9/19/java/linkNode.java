public class linkNode {
    private int val;
    private linkNode next;

    public linkNode(int val) {
        this.val = val;
    }

    public linkNode(int val, linkNode next) {
        this.val = val;
        this.next = next;
    }

    public void setNext(linkNode next) {
        this.next = next;
    }

    public linkNode getNext(){
        return this.next;
    }

    public void setValue(int val) {
        this.val = val;
    }

    public int getValue() {
        return this.val;
    }
}
