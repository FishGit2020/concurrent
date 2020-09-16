public class Server {
    public static void main (String[] args) {
        System.out.println("Hello World");
    }

    public Server () {
        System.out.println("You just created a server!");
        System.out.println(this.welcome());
    }

    private String welcome () {
        return "welcome!";
    }
}
