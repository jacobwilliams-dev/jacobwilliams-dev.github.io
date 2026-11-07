import {
  ClipboardList,
  Lightbulb,
  MessageCircle,
  Puzzle,
  RefreshCw,
  Search,
} from 'lucide-react'
import aiAssistedIcon from '../assets/skill-icons/ai-assisted.png'
import apiDesignIcon from '../assets/skill-icons/api-design.png'
import ciCdIcon from '../assets/skill-icons/ci-cd.png'
import claudeIcon from '../assets/skill-icons/claude.png'
import contextEngineeringIcon from '../assets/skill-icons/context-engineering.png'
import debuggingIcon from '../assets/skill-icons/debugging.png'
import environmentsIcon from '../assets/skill-icons/environment.png'
import expoIcon from '../assets/skill-icons/expo.png'
import gitHubIcon from '../assets/skill-icons/github.png'
import htmlIcon from '../assets/skill-icons/html.png'
import javaIcon from '../assets/skill-icons/java.png'
import javaScriptIcon from '../assets/skill-icons/javascript.png'
import jwtIcon from '../assets/skill-icons/jwt.png'
import mongoDbIcon from '../assets/skill-icons/mongodb.png'
import mySqlIcon from '../assets/skill-icons/mysql.png'
import nodeJsIcon from '../assets/skill-icons/nodejs.png'
import reactIcon from '../assets/skill-icons/react.png'
import specificationIcon from '../assets/skill-icons/specification.png'
import springBootIcon from '../assets/skill-icons/springboot.png'
import supabaseIcon from '../assets/skill-icons/supabase.png'

// JSON cannot hold a component, so homeContent.json names each icon as text
export const SKILL_ICONS = {
  ClipboardList,
  Lightbulb,
  MessageCircle,
  Puzzle,
  RefreshCw,
  Search,
}

// These icons are image files, so SkillGrid draws them as a mask instead of as a component
export const SKILL_IMAGES = {
  AiAssisted: aiAssistedIcon,
  ApiDesign: apiDesignIcon,
  CiCd: ciCdIcon,
  Claude: claudeIcon,
  ContextEngineering: contextEngineeringIcon,
  Debugging: debuggingIcon,
  Environments: environmentsIcon,
  Expo: expoIcon,
  GitHub: gitHubIcon,
  Html: htmlIcon,
  Java: javaIcon,
  JavaScript: javaScriptIcon,
  Jwt: jwtIcon,
  MongoDb: mongoDbIcon,
  MySql: mySqlIcon,
  NodeJs: nodeJsIcon,
  React: reactIcon,
  Specification: specificationIcon,
  SpringBoot: springBootIcon,
  Supabase: supabaseIcon,
}
