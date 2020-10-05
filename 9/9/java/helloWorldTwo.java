import java.util.ArrayList;

public class helloWorldTwo {

    public static void main(String[] args) {
        ArrayList<String> cars = new ArrayList<String>();
        cars.add("Altima");
        System.out.println(cars.get(0));

        String[] carsTwo = new String[20];
        carsTwo[1] = "Altima Two!";
        System.out.println(carsTwo[1]);
    }

}
