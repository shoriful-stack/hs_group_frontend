import { Calendar, Clock, Eye, FileText, User } from "lucide-react";
import type { ArticleDetail } from "@/data/news-article-detail";
import { NEWS_BODY } from "../constants";

type Props = { article: ArticleDetail };

export default function NewsDetailHeader({ article }: Props) {
  return (
    <header className="mx-auto mb-10 max-w-[900px] lg:mx-0">
      <span className="mb-4 inline-flex rounded-full border border-engineering/25 bg-engineering/10 px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-engineering uppercase">
        {article.category}
      </span>

      <h1 className="mb-5 text-3xl font-bold leading-[1.15] tracking-tight text-[#1a2b4a] sm:text-4xl lg:text-[44px] dark:text-foreground">
        {article.title}
      </h1>

      <p className={`mb-8 text-lg font-medium text-[#1a2b4a]/90 dark:text-foreground ${NEWS_BODY}`}>
        {article.summary}
      </p>

      <div className="flex flex-wrap gap-x-5 gap-y-3 border-y border-[#e8edf2] py-4 text-xs text-[#5a6478] sm:text-sm dark:border-border dark:text-foreground-muted">
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-engineering" aria-hidden />
          <time dateTime={article.date}>Published {article.dateLabel}</time>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-engineering" aria-hidden />
          <time dateTime={article.updatedDate}>Updated {article.updatedLabel}</time>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-engineering" aria-hidden />
          {article.readingTime}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-engineering" aria-hidden />
          {article.wordCount.toLocaleString()} words
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Eye className="h-3.5 w-3.5 text-engineering" aria-hidden />
          {article.views.toLocaleString()} views
        </span>
        <span className="inline-flex items-center gap-1.5">
          <User className="h-3.5 w-3.5 text-engineering" aria-hidden />
          {article.authorProfile.name}
          <span className="text-[#94a3b8]">· {article.authorProfile.designation}</span>
        </span>
      </div>
    </header>
  );
}
