export interface Post {
	slug: string;
	title: string;
	date: string;
	dateLabel: string;
	excerpt: string;
	html: string;
}

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!match) {
		return { data: {}, content: raw };
	}
	const [, frontmatter, content] = match;
	const data: Record<string, string> = {};
	for (const line of frontmatter.split(/\r?\n/)) {
		const lineMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
		if (!lineMatch) continue;
		let value = lineMatch[2].trim();
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}
		data[lineMatch[1]] = value;
	}
	return { data, content: content.trim() };
}

function escapeHtml(text: string): string {
	return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderInline(text: string): string {
	let out = escapeHtml(text);
	out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
	out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
	out = out.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
	out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />');
	out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
	return out;
}

function renderMarkdown(md: string): string {
	const lines = md.split(/\r?\n/);
	const html: string[] = [];
	let listType: 'ul' | 'ol' | null = null;
	let i = 0;

	function closeList() {
		if (listType) {
			html.push(listType === 'ul' ? '</ul>' : '</ol>');
			listType = null;
		}
	}

	const isBlockStart = (line: string) =>
		line.trim() === '' ||
		/^#{1,3}\s+/.test(line) ||
		/^>\s?/.test(line) ||
		/^-\s+/.test(line) ||
		/^\d+\.\s+/.test(line) ||
		/^(-{3,}|\*{3,})$/.test(line.trim());

	while (i < lines.length) {
		const line = lines[i];

		if (line.trim() === '') {
			closeList();
			i++;
			continue;
		}

		const heading = line.match(/^(#{1,3})\s+(.*)$/);
		if (heading) {
			closeList();
			const level = heading[1].length;
			html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
			i++;
			continue;
		}

		if (/^>\s?/.test(line)) {
			closeList();
			const quoteLines: string[] = [];
			while (i < lines.length && /^>\s?/.test(lines[i])) {
				quoteLines.push(lines[i].replace(/^>\s?/, ''));
				i++;
			}
			html.push(`<blockquote>${renderInline(quoteLines.join(' '))}</blockquote>`);
			continue;
		}

		if (/^-\s+/.test(line)) {
			if (listType !== 'ul') {
				closeList();
				html.push('<ul>');
				listType = 'ul';
			}
			html.push(`<li>${renderInline(line.replace(/^-\s+/, ''))}</li>`);
			i++;
			continue;
		}

		if (/^\d+\.\s+/.test(line)) {
			if (listType !== 'ol') {
				closeList();
				html.push('<ol>');
				listType = 'ol';
			}
			html.push(`<li>${renderInline(line.replace(/^\d+\.\s+/, ''))}</li>`);
			i++;
			continue;
		}

		if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
			closeList();
			html.push('<hr />');
			i++;
			continue;
		}

		closeList();
		const paraLines: string[] = [line];
		i++;
		while (i < lines.length && !isBlockStart(lines[i])) {
			paraLines.push(lines[i]);
			i++;
		}
		const paragraph = paraLines
			.map((rawLine, idx) => {
				const rendered = renderInline(rawLine.replace(/ {2,}$/, ''));
				if (idx === paraLines.length - 1) return rendered;
				return rendered + (/ {2,}$/.test(rawLine) ? '<br />' : ' ');
			})
			.join('');
		html.push(`<p>${paragraph}</p>`);
	}

	closeList();
	return html.join('\n');
}

function formatDateLabel(isoDate: string): string {
	if (!isoDate) return '';
	const parsed = new Date(`${isoDate}T00:00:00`);
	if (Number.isNaN(parsed.getTime())) return isoDate;
	return parsed.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const modules = import.meta.glob('/src/lib/posts/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>;

const posts: Post[] = Object.entries(modules)
	.map(([path, raw]) => {
		const slug = path.split('/').pop()!.replace(/\.md$/, '');
		const { data, content } = parseFrontmatter(raw);
		const date = data.date ?? '';
		return {
			slug,
			title: data.title ?? slug,
			date,
			dateLabel: formatDateLabel(date),
			excerpt: data.excerpt ?? '',
			html: renderMarkdown(content)
		};
	})
	.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

export function getAllPosts(): Post[] {
	return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
	return posts.find((p) => p.slug === slug);
}
