package imran.example;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.Test;

public class NewslettersTest {

    private static final String TECHNOLOGY = "Technology";
    private static final String HEALTHCARE = "Healthcare";

    private static final String JOHN = "john@any.org";
    private static final String BART = "bart@any.org";
    private static final String MARK = "mark@any.org";

    @Test
    public void findTopics_oneNewsletterAndOneSubscriber() {
        Newsletter technology = newsletter(TECHNOLOGY, JOHN);

        Map<String, List<String>> topics = Newsletters.findTopics(Arrays.asList(technology));

        Assert.assertEquals(Arrays.asList(TECHNOLOGY), topics.get(JOHN));
    }

    @Test
    public void findTopics_oneNewsletterAndSeveralSubscribers() {
        Newsletter technology = newsletter(TECHNOLOGY, JOHN);
        Newsletter healthcare = newsletter(HEALTHCARE, BART);

        Map<String, List<String>> topics = Newsletters.findTopics(Arrays.asList(technology, healthcare));

        Assert.assertEquals(Arrays.asList(TECHNOLOGY), topics.get(JOHN));
        Assert.assertEquals(Arrays.asList(HEALTHCARE), topics.get(BART));
    }

    @Test
    public void findTopics_severalNewslettersAndOneSubscriber() {
        Newsletter technology = newsletter(TECHNOLOGY, JOHN);
        Newsletter healthcare = newsletter(HEALTHCARE, JOHN);

        Map<String, List<String>> topics = Newsletters.findTopics(Arrays.asList(technology, healthcare));

        Assert.assertEquals(Arrays.asList(TECHNOLOGY, HEALTHCARE), topics.get(JOHN));
    }

    @Test
    public void findTopics_severalNewslettersAndSeveralSubscribers() {
        Newsletter technology = newsletter(TECHNOLOGY, JOHN, BART);
        Newsletter healthcare = newsletter(HEALTHCARE, JOHN, MARK);

        Map<String, List<String>> topics = Newsletters.findTopics(Arrays.asList(technology, healthcare));

        Assert.assertEquals(Arrays.asList(TECHNOLOGY, HEALTHCARE), topics.get(JOHN));
        Assert.assertEquals(Arrays.asList(TECHNOLOGY), topics.get(BART));
        Assert.assertEquals(Arrays.asList(HEALTHCARE), topics.get(MARK));
    }

    private Newsletter newsletter(String topic, String... subscribers) {
        Newsletter newsletter = new Newsletter();
        newsletter.setTopic(topic);
        newsletter.setSubscribers(Arrays.asList(subscribers));
        return newsletter;
    }

}
