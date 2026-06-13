import { Plus, Trash2 } from 'lucide-react';
import { EducationLevel, educationLevelLabels, SkillCategory, SkillLevel, skillCategoryLabels, skillLevelLabels, SkillProficiency } from '../../types/enums';
import { CustomSection, Resume, ResumeSectionType } from '../../types/resume';
import { createId, fromLines, toLines } from '../../utils/format';
import { Button } from './Button';

interface SectionEditorProps {
  resume: Resume;
  sectionId: ResumeSectionType;
  onChange: (patch: Partial<Resume>) => void;
}

const inputClass =
  'w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--ink)] placeholder:text-[var(--muted)]';
const textareaClass = `${inputClass} min-h-24 resize-y leading-6`;
const blockClass = 'border border-[var(--border)] bg-[var(--surface)] p-4';

function sectionTitle(resume: Resume, sectionId: ResumeSectionType) {
  return resume.sections.find((section) => section.id === sectionId)?.title ?? '模块';
}

export function SectionEditor({ resume, sectionId, onChange }: SectionEditorProps) {
  if (sectionId === 'summary') {
    return (
      <section className={blockClass}>
        <h2 className="font-display text-2xl font-semibold">{sectionTitle(resume, sectionId)}</h2>
        <label className="mt-5 block space-y-2 text-sm font-medium">
          <span>职业摘要</span>
          <textarea className={textareaClass} value={resume.summary} onChange={(event) => onChange({ summary: event.target.value })} />
        </label>
      </section>
    );
  }

  if (sectionId === 'work') {
    return (
      <section className={blockClass}>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold">{sectionTitle(resume, sectionId)}</h2>
          <Button
            icon={<Plus size={16} aria-hidden />}
            onClick={() =>
              onChange({
                workExperiences: [
                  ...resume.workExperiences,
                  {
                    id: createId('work'),
                    companyName: '新公司',
                    position: '职位名称',
                    startDate: '',
                    endDate: '',
                    responsibilities: ['负责事项'],
                    achievements: ['关键成果'],
                  },
                ],
              })
            }
          >
            添加
          </Button>
        </div>
        <div className="mt-5 space-y-4">
          {resume.workExperiences.map((item) => (
            <div className="border border-[var(--border)] bg-[var(--bg)] p-4" key={item.id}>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  className={inputClass}
                  value={item.companyName}
                  aria-label="公司名称"
                  onChange={(event) =>
                    onChange({
                      workExperiences: resume.workExperiences.map((work) =>
                        work.id === item.id ? { ...work, companyName: event.target.value } : work,
                      ),
                    })
                  }
                />
                <input
                  className={inputClass}
                  value={item.position}
                  aria-label="职位"
                  onChange={(event) =>
                    onChange({
                      workExperiences: resume.workExperiences.map((work) =>
                        work.id === item.id ? { ...work, position: event.target.value } : work,
                      ),
                    })
                  }
                />
                <input
                  className={inputClass}
                  value={item.startDate}
                  aria-label="开始时间"
                  placeholder="开始时间"
                  onChange={(event) =>
                    onChange({
                      workExperiences: resume.workExperiences.map((work) =>
                        work.id === item.id ? { ...work, startDate: event.target.value } : work,
                      ),
                    })
                  }
                />
                <input
                  className={inputClass}
                  value={item.endDate}
                  aria-label="结束时间"
                  placeholder="结束时间"
                  onChange={(event) =>
                    onChange({
                      workExperiences: resume.workExperiences.map((work) =>
                        work.id === item.id ? { ...work, endDate: event.target.value } : work,
                      ),
                    })
                  }
                />
              </div>
              <label className="mt-3 block space-y-2 text-sm font-medium">
                <span>职责描述，每行一条</span>
                <textarea
                  className={textareaClass}
                  value={fromLines(item.responsibilities)}
                  onChange={(event) =>
                    onChange({
                      workExperiences: resume.workExperiences.map((work) =>
                        work.id === item.id ? { ...work, responsibilities: toLines(event.target.value) } : work,
                      ),
                    })
                  }
                />
              </label>
              <label className="mt-3 block space-y-2 text-sm font-medium">
                <span>成就列表，每行一条</span>
                <textarea
                  className={textareaClass}
                  value={fromLines(item.achievements)}
                  onChange={(event) =>
                    onChange({
                      workExperiences: resume.workExperiences.map((work) =>
                        work.id === item.id ? { ...work, achievements: toLines(event.target.value) } : work,
                      ),
                    })
                  }
                />
              </label>
              <Button
                className="mt-3"
                icon={<Trash2 size={15} aria-hidden />}
                variant="ghost"
                onClick={() =>
                  onChange({ workExperiences: resume.workExperiences.filter((work) => work.id !== item.id) })
                }
              >
                删除经历
              </Button>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (sectionId === 'education') {
    return (
      <section className={blockClass}>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold">{sectionTitle(resume, sectionId)}</h2>
          <Button
            icon={<Plus size={16} aria-hidden />}
            onClick={() =>
              onChange({
                educations: [
                  ...resume.educations,
                  {
                    id: createId('edu'),
                    school: '学校名称',
                    major: '专业',
                    level: EducationLevel.Bachelor,
                    startDate: '',
                    endDate: '',
                    gpa: '',
                    honors: [],
                  },
                ],
              })
            }
          >
            添加
          </Button>
        </div>
        <div className="mt-5 space-y-4">
          {resume.educations.map((item) => (
            <div className="border border-[var(--border)] bg-[var(--bg)] p-4" key={item.id}>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  className={inputClass}
                  value={item.school}
                  aria-label="学校"
                  onChange={(event) =>
                    onChange({
                      educations: resume.educations.map((education) =>
                        education.id === item.id ? { ...education, school: event.target.value } : education,
                      ),
                    })
                  }
                />
                <input
                  className={inputClass}
                  value={item.major}
                  aria-label="专业"
                  onChange={(event) =>
                    onChange({
                      educations: resume.educations.map((education) =>
                        education.id === item.id ? { ...education, major: event.target.value } : education,
                      ),
                    })
                  }
                />
                <select
                  className={inputClass}
                  value={item.level}
                  aria-label="学历"
                  onChange={(event) =>
                    onChange({
                      educations: resume.educations.map((education) =>
                        education.id === item.id ? { ...education, level: event.target.value as EducationLevel } : education,
                      ),
                    })
                  }
                >
                  {Object.values(EducationLevel).map((level) => (
                    <option key={level} value={level}>
                      {educationLevelLabels[level]}
                    </option>
                  ))}
                </select>
                <input
                  className={inputClass}
                  value={item.gpa}
                  aria-label="GPA"
                  placeholder="GPA"
                  onChange={(event) =>
                    onChange({
                      educations: resume.educations.map((education) =>
                        education.id === item.id ? { ...education, gpa: event.target.value } : education,
                      ),
                    })
                  }
                />
                <input
                  className={inputClass}
                  value={item.startDate}
                  aria-label="开始时间"
                  placeholder="开始时间"
                  onChange={(event) =>
                    onChange({
                      educations: resume.educations.map((education) =>
                        education.id === item.id ? { ...education, startDate: event.target.value } : education,
                      ),
                    })
                  }
                />
                <input
                  className={inputClass}
                  value={item.endDate}
                  aria-label="结束时间"
                  placeholder="结束时间"
                  onChange={(event) =>
                    onChange({
                      educations: resume.educations.map((education) =>
                        education.id === item.id ? { ...education, endDate: event.target.value } : education,
                      ),
                    })
                  }
                />
              </div>
              <label className="mt-3 block space-y-2 text-sm font-medium">
                <span>荣誉，每行一条</span>
                <textarea
                  className={textareaClass}
                  value={fromLines(item.honors)}
                  onChange={(event) =>
                    onChange({
                      educations: resume.educations.map((education) =>
                        education.id === item.id ? { ...education, honors: toLines(event.target.value) } : education,
                      ),
                    })
                  }
                />
              </label>
              <Button
                className="mt-3"
                icon={<Trash2 size={15} aria-hidden />}
                variant="ghost"
                onClick={() => onChange({ educations: resume.educations.filter((education) => education.id !== item.id) })}
              >
                删除教育
              </Button>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (sectionId === 'skills') {
    return (
      <section className={blockClass}>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold">{sectionTitle(resume, sectionId)}</h2>
          <Button
            icon={<Plus size={16} aria-hidden />}
            onClick={() =>
              onChange({
                skills: [
                  ...resume.skills,
                  {
                    id: createId('skill'),
                    name: '新技能',
                    level: SkillLevel.Intermediate,
                    proficiency: 3,
                    category: SkillCategory.Technology,
                  },
                ],
              })
            }
          >
            添加
          </Button>
        </div>
        <div className="mt-5 space-y-3">
          {resume.skills.map((item) => (
            <div className="grid gap-3 border border-[var(--border)] bg-[var(--bg)] p-3 md:grid-cols-[1.2fr_1fr_1fr_0.8fr_auto]" key={item.id}>
              <input
                className={inputClass}
                value={item.name}
                aria-label="技能名称"
                onChange={(event) =>
                  onChange({
                    skills: resume.skills.map((skill) =>
                      skill.id === item.id ? { ...skill, name: event.target.value } : skill,
                    ),
                  })
                }
              />
              <select
                className={inputClass}
                value={item.category}
                aria-label="技能分类"
                onChange={(event) =>
                  onChange({
                    skills: resume.skills.map((skill) =>
                      skill.id === item.id ? { ...skill, category: event.target.value as SkillCategory } : skill,
                    ),
                  })
                }
              >
                {Object.values(SkillCategory).map((category) => (
                  <option key={category} value={category}>
                    {skillCategoryLabels[category]}
                  </option>
                ))}
              </select>
              <select
                className={inputClass}
                value={item.level}
                aria-label="熟练度标签"
                onChange={(event) =>
                  onChange({
                    skills: resume.skills.map((skill) =>
                      skill.id === item.id ? { ...skill, level: event.target.value as SkillLevel } : skill,
                    ),
                  })
                }
              >
                {Object.values(SkillLevel).map((level) => (
                  <option key={level} value={level}>
                    {skillLevelLabels[level]}
                  </option>
                ))}
              </select>
              <select
                className={inputClass}
                value={item.proficiency}
                aria-label="熟练度分数"
                onChange={(event) =>
                  onChange({
                    skills: resume.skills.map((skill) =>
                      skill.id === item.id
                        ? { ...skill, proficiency: Number(event.target.value) as SkillProficiency }
                        : skill,
                    ),
                  })
                }
              >
                {([1, 2, 3, 4, 5] as SkillProficiency[]).map((score) => (
                  <option key={score} value={score}>
                    {score}
                  </option>
                ))}
              </select>
              <Button
                className="px-3"
                icon={<Trash2 size={15} aria-hidden />}
                variant="ghost"
                aria-label="删除技能"
                onClick={() => onChange({ skills: resume.skills.filter((skill) => skill.id !== item.id) })}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (sectionId === 'projects') {
    return (
      <section className={blockClass}>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold">{sectionTitle(resume, sectionId)}</h2>
          <Button
            icon={<Plus size={16} aria-hidden />}
            onClick={() =>
              onChange({
                projects: [
                  ...resume.projects,
                  {
                    id: createId('project'),
                    name: '新项目',
                    role: '角色',
                    startDate: '',
                    endDate: '',
                    techStack: [],
                    description: '项目描述',
                    outcomes: [],
                  },
                ],
              })
            }
          >
            添加
          </Button>
        </div>
        <div className="mt-5 space-y-4">
          {resume.projects.map((item) => (
            <div className="border border-[var(--border)] bg-[var(--bg)] p-4" key={item.id}>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  className={inputClass}
                  value={item.name}
                  aria-label="项目名称"
                  onChange={(event) =>
                    onChange({
                      projects: resume.projects.map((project) =>
                        project.id === item.id ? { ...project, name: event.target.value } : project,
                      ),
                    })
                  }
                />
                <input
                  className={inputClass}
                  value={item.role}
                  aria-label="角色"
                  onChange={(event) =>
                    onChange({
                      projects: resume.projects.map((project) =>
                        project.id === item.id ? { ...project, role: event.target.value } : project,
                      ),
                    })
                  }
                />
                <input
                  className={inputClass}
                  value={item.startDate}
                  aria-label="开始时间"
                  placeholder="开始时间"
                  onChange={(event) =>
                    onChange({
                      projects: resume.projects.map((project) =>
                        project.id === item.id ? { ...project, startDate: event.target.value } : project,
                      ),
                    })
                  }
                />
                <input
                  className={inputClass}
                  value={item.endDate}
                  aria-label="结束时间"
                  placeholder="结束时间"
                  onChange={(event) =>
                    onChange({
                      projects: resume.projects.map((project) =>
                        project.id === item.id ? { ...project, endDate: event.target.value } : project,
                      ),
                    })
                  }
                />
              </div>
              <label className="mt-3 block space-y-2 text-sm font-medium">
                <span>技术栈，每行一项</span>
                <textarea
                  className={textareaClass}
                  value={fromLines(item.techStack)}
                  onChange={(event) =>
                    onChange({
                      projects: resume.projects.map((project) =>
                        project.id === item.id ? { ...project, techStack: toLines(event.target.value) } : project,
                      ),
                    })
                  }
                />
              </label>
              <label className="mt-3 block space-y-2 text-sm font-medium">
                <span>项目描述</span>
                <textarea
                  className={textareaClass}
                  value={item.description}
                  onChange={(event) =>
                    onChange({
                      projects: resume.projects.map((project) =>
                        project.id === item.id ? { ...project, description: event.target.value } : project,
                      ),
                    })
                  }
                />
              </label>
              <label className="mt-3 block space-y-2 text-sm font-medium">
                <span>成果，每行一条</span>
                <textarea
                  className={textareaClass}
                  value={fromLines(item.outcomes)}
                  onChange={(event) =>
                    onChange({
                      projects: resume.projects.map((project) =>
                        project.id === item.id ? { ...project, outcomes: toLines(event.target.value) } : project,
                      ),
                    })
                  }
                />
              </label>
              <Button
                className="mt-3"
                icon={<Trash2 size={15} aria-hidden />}
                variant="ghost"
                onClick={() => onChange({ projects: resume.projects.filter((project) => project.id !== item.id) })}
              >
                删除项目
              </Button>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const customSection = (resume.customSections ?? []).find((section) => section.id === sectionId);
  if (customSection) {
    const updateCustomSection = (patch: Partial<CustomSection>) => {
      onChange({
        sections: resume.sections.map((section) =>
          section.id === sectionId ? { ...section, title: patch.title ?? section.title } : section,
        ),
        customSections: (resume.customSections ?? []).map((section) =>
          section.id === sectionId ? { ...section, ...patch } : section,
        ),
      });
    };

    const updateItem = (itemId: string, patch: Record<string, unknown>) => {
      updateCustomSection({
        items: customSection.items.map((item) =>
          item.id === itemId ? { ...item, ...patch } : item,
        ),
      });
    };

    const addItem = () => {
      updateCustomSection({
        items: [
          ...customSection.items,
          {
            id: createId('custom-item'),
            title: '新条目',
            subtitle: '',
            dateRange: '',
            description: '',
            bullets: [],
          },
        ],
      });
    };

    const deleteItem = (itemId: string) => {
      updateCustomSection({
        items: customSection.items.filter((item) => item.id !== itemId),
      });
    };

    return (
      <section className={blockClass}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-[var(--muted)]">模块标题</label>
            <input
              className={`mt-1 ${inputClass} font-display text-2xl font-semibold`}
              value={customSection.title}
              onChange={(e) => updateCustomSection({ title: e.target.value })}
            />
          </div>
          <Button icon={<Plus size={16} aria-hidden />} onClick={addItem}>
            添加条目
          </Button>
        </div>
        <div className="mt-5 space-y-4">
          {customSection.items.map((item) => (
            <div className="border border-[var(--border)] bg-[var(--bg)] p-4" key={item.id}>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  className={inputClass}
                  value={item.title}
                  aria-label="标题"
                  placeholder="标题"
                  onChange={(e) => updateItem(item.id, { title: e.target.value })}
                />
                <input
                  className={inputClass}
                  value={item.subtitle ?? ''}
                  aria-label="副标题"
                  placeholder="副标题"
                  onChange={(e) => updateItem(item.id, { subtitle: e.target.value })}
                />
                <input
                  className={inputClass}
                  value={item.dateRange ?? ''}
                  aria-label="时间范围"
                  placeholder="时间范围，如：2020.01 - 至今"
                  onChange={(e) => updateItem(item.id, { dateRange: e.target.value })}
                />
              </div>
              <label className="mt-3 block space-y-2 text-sm font-medium">
                <span>描述</span>
                <textarea
                  className={textareaClass}
                  value={item.description}
                  placeholder="描述内容..."
                  onChange={(e) => updateItem(item.id, { description: e.target.value })}
                />
              </label>
              <label className="mt-3 block space-y-2 text-sm font-medium">
                <span>要点列表，每行一条</span>
                <textarea
                  className={textareaClass}
                  value={fromLines(item.bullets)}
                  placeholder="每条一行..."
                  onChange={(e) => updateItem(item.id, { bullets: toLines(e.target.value) })}
                />
              </label>
              <Button
                className="mt-3"
                icon={<Trash2 size={15} aria-hidden />}
                variant="ghost"
                onClick={() => deleteItem(item.id)}
              >
                删除条目
              </Button>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return null;
}

