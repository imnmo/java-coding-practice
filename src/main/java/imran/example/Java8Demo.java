package imran.example;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class Java8Demo {
	
	
	/**
	 * Sample demo of Java 8 in action with Lambdas and method ref
	 * and map,reduce, filter, stream
	 */
	public void inAction(){
		final  List<BigDecimal> prices = Arrays.asList(
				new BigDecimal("10"), new BigDecimal("30"), new BigDecimal("17"),
				new BigDecimal("20"), new BigDecimal("15"), new BigDecimal("18"),
				new BigDecimal("45"), new BigDecimal("12"));
		final BigDecimal totalOfDiscountedPrices =
				prices.stream()
				.filter(price -> price.compareTo(BigDecimal.valueOf(20)) > 0)
				.map(price -> price.multiply(BigDecimal.valueOf(0.9)))
				.reduce(BigDecimal.ZERO, BigDecimal::add);
		
		System.out.println("Total of discounted prices: " + totalOfDiscountedPrices);
		
		//This piece just prints the prices after filtering or mapping 
		prices.stream()
		.map(price -> price.compareTo(BigDecimal.valueOf(20)) > 0)
		.forEach(price -> System.out.println(price));	
		
 
	}

	/**
	 * prints the names  using for each technique
	 */
	public void PrintNames()
	{
		final List<String> friends =
				Arrays.asList("Brian", "Nate", "Neal", "Raju", "Sara", "Scott");
		friends.forEach(name ->System.out.println(name));
	}
	
	
	/**
	 * Find a name starting with N and print them l
	 */
	public void FindNameWithN()
	{
		final List<String> friends =
				Arrays.asList("Brian", "Nate", "Neal", "Raju", "Sara", "Scott");	
		
		//filter the "N"
		final List<String> startWIthN =
		friends
		.stream()
		.filter(name -> (name.startsWith("N")))
		.collect(Collectors.toList());
		
		//print the name with "N"
		startWIthN
		.forEach(name ->System.out.println(name));
	}
	
	/**
	 * Pick an name for the argument passed on
	 */
	
	public void PickAnElement()
	{

		final List<String> friends =
				Arrays.asList("Brian", "Nate", "Neal", "Raju", "Sara", "Scott");	
		
		
		//filter the "N"
		final Optional<String>  foundName=
		friends
		.stream()
		.filter(name -> (name.startsWith("N")))
		.findFirst();
		System.out.println(foundName.orElse("No name"));

	}
	
	
	/**
	 * Count the characters in the name
	 */
	public void CountTheCharacter()
	{
	       final List<String> friends =
	                Arrays.asList("Brian", "Nate", "Neal", "Raju", "Sara", "Scott");    
	       
	    System.out.println("Total number of characters in all names: " +
	            friends.stream()
	            .mapToInt(name -> name.length())
	            .sum());
	}
	
	/**
	 * Picks the longest name
	 */
	
	public void PickLongest()
	{
        final List<String> friends =
                Arrays.asList("Brian", "Nate", "Neal", "Raju", "Sara", "Scott");    
        
	    final Optional<String> aLongName =
	            friends.stream()
	            .reduce((name1, name2) ->
	            name1.length() >= name2.length() ? name1 : name2);
	            aLongName.ifPresent(name ->
	            System.out.println(String.format("A longest name: %s", name)));
	}
}