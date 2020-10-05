public class Main {
    public static void main(String[] arg) {
        linkNode head = new linkNode(1);
        head.setNext(new linkNode(2));
        System.out.println(head.getValue());
        System.out.println(head.getNext().getValue());
    }
}
