package sn.ism.gestion;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {
    @GetMapping({ "/", "/{path:[^\\.]*}" })
    public String forward() {
        return "forward:/browser/index.html";
    }
}
