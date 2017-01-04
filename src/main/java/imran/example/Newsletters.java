package imran.example;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public final class Newsletters {

    private Newsletters() {
    }

    /**
     * Select list of topics for each subscriber.
     * 
     * @param newsletters
     *            the list of newsletters.
     * 
     * @return the topics for each subscriber.
     */
    public static Map<String, List<String>> findTopics(List<Newsletter> newsletters) {
        Map<String, List<String>> subcriberKeyWithTopicsInvalue = new LinkedHashMap<>();

        for(Newsletter newsletter: newsletters)
        {
            for(String subcriber: newsletter.getSubscribers())
            {
                //Add a unique key to map
                if(!subcriberKeyWithTopicsInvalue.containsKey(subcriber))
                {
                    subcriberKeyWithTopicsInvalue.put(subcriber, new ArrayList<>());
                }
                subcriberKeyWithTopicsInvalue.get(subcriber).add(newsletter.getTopic());
            }
        }
        return subcriberKeyWithTopicsInvalue;
    }
}
