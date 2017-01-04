package imran.example;

import static org.junit.Assert.*;

import org.junit.Test;

public class Java8DemoTest {

	@Test
	public void test() {
	
		Java8Demo myDemo = new Java8Demo();
		myDemo.inAction();
		myDemo.PrintNames();
		myDemo.FindNameWithN();
		myDemo.PickAnElement();
		myDemo.CountTheCharacter();
		myDemo.PickLongest();
	}

}
