"use client";

import { useEffect, useMemo, useState } from "react";
import { Layers3, PencilLine, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type {
  AdminMessageTemplateRecord,
  MessageTemplateChannel,
} from "@/lib/admin-message-templates";

type ChannelOption = {
  value: string;
  label: string;
};

type AdminTemplateManagerProps = {
  templates: AdminMessageTemplateRecord[];
  channelOptions: readonly ChannelOption[];
  templateErrorMessage?: string;
};

type TemplateDraft = {
  name: string;
  subject: string;
  body: string;
};

function sortTemplates(templates: AdminMessageTemplateRecord[]) {
  return [...templates].sort((left, right) => {
    const updatedAtCompare = right.updated_at.localeCompare(left.updated_at);

    if (updatedAtCompare !== 0) {
      return updatedAtCompare;
    }

    return right.id - left.id;
  });
}

function isTemplateChannel(value: string): value is MessageTemplateChannel {
  return value === "email" || value === "whatsapp";
}

function getEmptyDraft(): TemplateDraft {
  return {
    name: "",
    subject: "",
    body: "",
  };
}

function getTemplateExcerpt(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= 120) {
    return normalized;
  }

  return `${normalized.slice(0, 117)}...`;
}

function formatTemplateTimestamp(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function AdminTemplateManager({
  templates,
  channelOptions,
  templateErrorMessage,
}: AdminTemplateManagerProps) {
  const [templatesState, setTemplatesState] = useState(() =>
    sortTemplates(templates),
  );
  const [activeChannel, setActiveChannel] =
    useState<MessageTemplateChannel>("email");
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    null,
  );
  const [draft, setDraft] = useState<TemplateDraft>(getEmptyDraft);
  const [errorMessage, setErrorMessage] = useState(templateErrorMessage ?? "");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setTemplatesState(sortTemplates(templates));
  }, [templates]);

  const templatesForChannel = useMemo(
    () =>
      templatesState.filter((template) => template.channel === activeChannel),
    [activeChannel, templatesState],
  );

  const filteredTemplates = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    if (!normalizedSearchQuery) {
      return templatesForChannel;
    }

    return templatesForChannel.filter((template) => {
      const searchableText = [
        template.name,
        template.subject ?? "",
        template.body,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearchQuery);
    });
  }, [searchQuery, templatesForChannel]);

  const selectedTemplate = useMemo(
    () =>
      selectedTemplateId === null
        ? null
        : (templatesState.find(
            (template) => template.id === selectedTemplateId,
          ) ?? null),
    [selectedTemplateId, templatesState],
  );

  function resetComposer(channel: MessageTemplateChannel = activeChannel) {
    setSelectedTemplateId(null);
    setDraft(getEmptyDraft());
    setActiveChannel(channel);
    setSuccessMessage("");
    setErrorMessage(templateErrorMessage ?? "");
  }

  function applyTemplate(template: AdminMessageTemplateRecord) {
    setSelectedTemplateId(template.id);
    setActiveChannel(template.channel);
    setDraft({
      name: template.name,
      subject: template.subject ?? "",
      body: template.body,
    });
    setSuccessMessage("");
    setErrorMessage(templateErrorMessage ?? "");
  }

  function updateDraft<K extends keyof TemplateDraft>(
    key: K,
    value: TemplateDraft[K],
  ) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [key]: value,
    }));
  }

  function handleChannelChange(value: string) {
    if (!isTemplateChannel(value)) {
      return;
    }

    resetComposer(value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(templateErrorMessage ?? "");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/message-templates", {
        method: selectedTemplate ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          id: selectedTemplate?.id,
          channel: activeChannel,
          name: draft.name,
          subject: activeChannel === "email" ? draft.subject : undefined,
          body: draft.body,
        }),
      });
      const payload = (await response.json()) as {
        error?: string;
        template?: AdminMessageTemplateRecord;
      };

      if (!response.ok || !payload.template) {
        setErrorMessage(payload.error || "Unable to save template.");
        return;
      }

      setTemplatesState((currentTemplates) => {
        const nextTemplates = currentTemplates.filter(
          (template) => template.id !== payload.template!.id,
        );
        return sortTemplates([payload.template!, ...nextTemplates]);
      });
      applyTemplate(payload.template);
      setSuccessMessage(
        selectedTemplate
          ? `Updated template \"${payload.template.name}\".`
          : `Created template \"${payload.template.name}\".`,
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to save template.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!selectedTemplate) {
      return;
    }

    if (!window.confirm(`Delete template \"${selectedTemplate.name}\"?`)) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage(templateErrorMessage ?? "");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/admin/message-templates", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          id: selectedTemplate.id,
        }),
      });
      const payload = (await response.json()) as {
        error?: string;
      };

      if (!response.ok) {
        setErrorMessage(payload.error || "Unable to delete template.");
        return;
      }

      setTemplatesState((currentTemplates) =>
        currentTemplates.filter(
          (template) => template.id !== selectedTemplate.id,
        ),
      );
      resetComposer(activeChannel);
      setSuccessMessage(`Deleted template \"${selectedTemplate.name}\".`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to delete template.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-950">
            Template workspace
          </p>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            Browse templates in the master list on the left, then edit the
            selected record in a wider detail pane.
          </p>
        </div>

        <Tabs value={activeChannel} onValueChange={handleChannelChange}>
          <TabsList>
            {channelOptions.map((channel) => (
              <TabsTrigger key={channel.value} value={channel.value}>
                {channel.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {errorMessage ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-start">
        <div className="space-y-4 xl:sticky xl:top-6">
          <div className="rounded-4xl border border-slate-200 bg-slate-50 px-5 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950">
                  {activeChannel === "email" ? "Email" : "WhatsApp"} templates
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Search the library, then open one item at a time in the detail pane.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-slate-200"
                onClick={() => resetComposer(activeChannel)}
              >
                <Plus className="h-4 w-4" />
                New template
              </Button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={`Search ${activeChannel} templates`}
                  className="border-slate-200 bg-white pl-10"
                />
              </div>
              <p className="text-xs text-slate-500">
                Showing {filteredTemplates.length} of {templatesForChannel.length}{" "}
                {activeChannel} templates.
              </p>
            </div>
          </div>

          <div className="max-h-[calc(100vh-15rem)] space-y-3 overflow-y-auto pr-1">
            {filteredTemplates.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-200 bg-white px-5 py-10 text-center text-sm text-slate-500">
                {searchQuery.trim()
                  ? `No ${activeChannel} templates match your search.`
                  : `No ${activeChannel} templates saved yet.`}
              </div>
            ) : (
              filteredTemplates.map((template) => {
              const isSelected = template.id === selectedTemplateId;

              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => applyTemplate(template)}
                  className={`w-full rounded-3xl border px-5 py-5 text-left transition ${
                    isSelected
                      ? "border-slate-950 bg-slate-950 text-white shadow-[0_24px_60px_rgba(15,23,42,0.12)]"
                      : "border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{template.name}</p>
                      <p
                        className={`mt-1 text-xs ${
                          isSelected ? "text-white/65" : "text-slate-500"
                        }`}
                      >
                        Updated {formatTemplateTimestamp(template.updated_at)}
                      </p>
                    </div>
                    <div
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-2xl ${
                        isSelected
                          ? "bg-white/10 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      <PencilLine className="h-4 w-4" />
                    </div>
                  </div>

                  {template.subject ? (
                    <div
                      className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                        isSelected
                          ? "border-white/10 bg-white/6 text-white/80"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      <div
                        className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${
                          isSelected ? "text-white/55" : "text-slate-500"
                        }`}
                      >
                        Subject
                      </div>
                      <div className="mt-2">{template.subject}</div>
                    </div>
                  ) : null}

                  <p
                    className={`mt-4 text-sm leading-6 ${
                      isSelected ? "text-white/75" : "text-slate-600"
                    }`}
                  >
                    {getTemplateExcerpt(template.body)}
                  </p>
                </button>
              );
              })
            )}
          </div>
        </div>

        <form
          className="space-y-5 rounded-4xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:px-7 sm:py-7"
          onSubmit={handleSubmit}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-950">
                {selectedTemplate ? "Edit template" : "Create template"}
              </p>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Build reusable drafts for outreach and keep the editor wide
                enough for longer subjects and message bodies.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              <Layers3 className="h-4 w-4" />
              {activeChannel}
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="template-name"
            >
              Template name
            </label>
            <Input
              id="template-name"
              value={draft.name}
              onChange={(event) => updateDraft("name", event.target.value)}
              placeholder={
                activeChannel === "email"
                  ? "Pricing follow-up"
                  : "WhatsApp quick check-in"
              }
              className="border-slate-200"
            />
          </div>

          {activeChannel === "email" ? (
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="template-subject"
              >
                Subject
              </label>
              <Input
                id="template-subject"
                value={draft.subject}
                onChange={(event) => updateDraft("subject", event.target.value)}
                placeholder="Checking in on your {{product_label}} request"
                className="border-slate-200"
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="template-body"
            >
              Message body
            </label>
            <Textarea
              id="template-body"
              value={draft.body}
              onChange={(event) => updateDraft("body", event.target.value)}
              placeholder={
                activeChannel === "email"
                  ? "Hi {{first_name}},\n\nI wanted to follow up on your interest in {{product_label}}..."
                  : "Hi {{first_name}}, thanks for reaching out about {{product_label}}..."
              }
              className="min-h-56 border-slate-200 bg-white"
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Placeholder quick reference
            </div>
            <div className="mt-2 leading-7">
              {"{{name}}, {{first_name}}, {{company}}, {{product_label}}, {{email}}, and {{phone}}."}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-slate-950 text-white hover:bg-slate-800"
            >
              {isSubmitting
                ? selectedTemplate
                  ? "Saving changes..."
                  : "Creating template..."
                : selectedTemplate
                  ? "Save changes"
                  : "Create template"}
            </Button>

            {selectedTemplate ? (
              <Button
                type="button"
                variant="outline"
                disabled={isDeleting}
                className="rounded-full border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-700"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? "Deleting..." : "Delete template"}
              </Button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
